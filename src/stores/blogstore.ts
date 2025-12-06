import { create } from 'zustand';
import { databases, storage, ID, Query } from '@/lib/appwrite';
import { Models } from 'appwrite';

// Environment variables check
const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COL_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

export interface BlogPost extends Models.Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
}

// Payload type for creating/updating
interface PostPayload {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;

  // Actions
  fetchPosts: () => Promise<void>;
  getPostBySlug: (slug: string) => Promise<void>;
  createPost: (data: PostPayload) => Promise<void>;
  updatePost: (id: string, data: Partial<PostPayload>) => Promise<void>; // New Action
  deletePost: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  currentPost: null,
  loading: false,

  fetchPosts: async () => {
    set({ loading: true });
    try {
      const response = await databases.listDocuments<BlogPost>(DB_ID, COL_ID, [
        Query.orderDesc('$createdAt'),
      ]);
      set({ posts: response.documents });
    } catch (error) {
      console.error("Store: Failed to fetch posts", error);
    } finally {
      set({ loading: false });
    }
  },

  getPostBySlug: async (slug: string) => {
    set({ loading: true });
    try {
      const response = await databases.listDocuments<BlogPost>(DB_ID, COL_ID, [
        Query.equal('slug', slug),
      ]);
      set({ currentPost: response.documents[0] || null });
    } catch (error) {
      console.error("Store: Failed to get post", error);
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (data) => {
    set({ loading: true });
    try {
      // Simple slug generation
      const slug = data.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      
      const newPost = await databases.createDocument(DB_ID, COL_ID, ID.unique(), {
        ...data,
        slug,
      });

      set((state) => ({ posts: [newPost as unknown as BlogPost, ...state.posts] }));
    } catch (error) {
      console.error("Store: Failed to create post", error);
      throw error; // Re-throw to handle in UI
    } finally {
      set({ loading: false });
    }
  },

  updatePost: async (id, data) => {
    set({ loading: true });
    try {
      // We generally do NOT update the slug to preserve SEO, even if title changes
      const updatedPost = await databases.updateDocument(DB_ID, COL_ID, id, data);

      set((state) => ({
        posts: state.posts.map((post) => 
          post.$id === id ? { ...post, ...updatedPost } as unknown as BlogPost : post
        ),
        currentPost: state.currentPost?.$id === id 
          ? { ...state.currentPost, ...updatedPost } as unknown as BlogPost 
          : state.currentPost
      }));
    } catch (error) {
      console.error("Store: Failed to update post", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true });
    try {
      await databases.deleteDocument(DB_ID, COL_ID, id);
      set((state) => ({ posts: state.posts.filter((p) => p.$id !== id) }));
    } catch (error) {
      console.error("Store: Failed to delete post", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  uploadImage: async (file: File) => {
    set({ loading: true });
    try {
      const fileId = ID.unique();
      await storage.createFile(BUCKET_ID, fileId, file);
      
      // Get the view URL
      const imageUrl = storage.getFileView(BUCKET_ID, fileId);
      return imageUrl.toString();
    } catch (error) {
      console.error("Store: Failed to upload image", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));