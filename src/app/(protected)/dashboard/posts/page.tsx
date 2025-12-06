"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BlogPost, useBlogStore } from "@/stores/blogstore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Copy,
  Check,
  Edit,
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import React from "react";

// ====== Zod Schemas ======
const blogPostFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt must be less than 300 characters")
    .trim(),
  content: z
    .string()
    .min(1, "Content is required")
    .min(50, "Content must be at least 50 characters")
    .max(50000, "Content must be less than 50,000 characters")
    .trim(),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

// ====== Main Component ======
export default function PostsPage() {
  const {
    posts,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    uploadImage,
    loading: blogLoading,
  } = useBlogStore();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
    },
  });

  const coverImageValue = form.watch("coverImage");

  useEffect(() => {
    fetchPosts().catch((error) => {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to load blog posts");
    });
  }, [fetchPosts]);

  // ====== Form Handlers ======
  const resetForm = () => {
    form.reset();
    setEditingId(null);
    setIsFormOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingId(post.$id);
    form.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
    });
    setIsFormOpen(true);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, WebP, or GIF)");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size must be less than 5MB");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setIsUploading(true);
      try {
        const url = await uploadImage(file);
        form.setValue("coverImage", url, {
          shouldValidate: true,
          shouldDirty: true,
        });
        toast.success("Image uploaded successfully");
      } catch (error: any) {
        console.error("Image upload error:", error);
        toast.error(error.message || "Failed to upload image");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } finally {
        setIsUploading(false);
      }
    }
  };

  const copyToClipboard = () => {
    if (coverImageValue) {
      const markdown = `![Cover Image](${coverImageValue})`;
      navigator.clipboard.writeText(markdown);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success("Markdown copied to clipboard");
    }
  };

  const handleSubmit = async (values: BlogPostFormValues) => {
    try {
      if (editingId) {
        await updatePost(editingId, values);
        toast.success("Post updated successfully");
      } else {
        await createPost(values);
        toast.success("Post created successfully");
      }
      resetForm();
    } catch (error: any) {
      console.error("Post save error:", error);
      toast.error(
        error.message ||
          (editingId ? "Failed to update post" : "Failed to create post")
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
    } catch (error: any) {
      console.error("Post delete error:", error);
      toast.error(error.message || "Failed to delete post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, and manage your content.
          </p>
        </div>
        <Button
          onClick={() => {
            if (isFormOpen) {
              resetForm();
            } else {
              setIsFormOpen(true);
            }
          }}
          variant={isFormOpen ? "outline" : "default"}
        >
          {isFormOpen ? (
            <>
              <X className="mr-2 h-4 w-4" /> Cancel
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </>
          )}
        </Button>
      </div>

      {/* Post Form Card */}
      {isFormOpen && (
        <Card className="mb-8 border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Post" : "Create New Post"}
            </CardTitle>
            <CardDescription>
              Fill in the details below. Markdown is supported in the content area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {/* Title & Excerpt */}
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title"
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Short summary for SEO"
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Cover Image */}
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Cover Image
                      </FormLabel>
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleImageSelect}
                            ref={fileInputRef}
                            className="w-full sm:w-auto cursor-pointer file:text-primary"
                            disabled={
                              form.formState.isSubmitting || isUploading
                            }
                          />
                          {isUploading && (
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Loader2 className="animate-spin w-3 h-3 mr-2" />
                              Uploading...
                            </span>
                          )}
                        </div>

                        {coverImageValue && (
                          <div className="flex items-center justify-between p-2 bg-background rounded-md border border-border shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 border border-border bg-muted">
                                <img
                                  src={coverImageValue}
                                  alt="Cover preview"
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "";
                                    toast.error("Failed to load image preview");
                                  }}
                                />
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-medium">
                                  Image Ready
                                </span>
                                <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                                  {coverImageValue}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={copyToClipboard}
                                title="Copy Markdown"
                              >
                                {isCopied ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  form.setValue("coverImage", "", {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  });
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <FormDescription>
                        Upload a cover image (JPEG, PNG, WebP, or GIF, max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your masterpiece here... (Markdown supported)"
                          className="min-h-[300px] font-mono text-sm leading-relaxed resize-y"
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Supports Markdown formatting for rich text content.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={resetForm}
                    disabled={form.formState.isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      form.formState.isSubmitting || !form.formState.isDirty
                    }
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    )}
                    {editingId ? "Update Post" : "Publish Post"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {blogLoading && posts.length === 0 ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">
              Loading posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">No posts found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create your first blog post to get started!
                </p>
              </div>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <Card
              key={post.$id}
              className="group hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="font-mono text-xs">
                    /{post.slug} •{" "}
                    {new Date(post.$createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(post)}
                    disabled={blogLoading}
                  >
                    <Edit className="h-3.5 w-3.5 mr-2" /> Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-9 w-9"
                        disabled={blogLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete{" "}
                          <span className="font-bold text-foreground">
                            "{post.title}"
                          </span>
                          ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.$id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Post
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </CardContent>
              {post.coverImage && (
                <CardFooter className="pt-0 pb-3">
                  <Badge variant="secondary" className="gap-1.5">
                    <ImageIcon className="w-3 h-3" /> Cover Image Attached
                  </Badge>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}