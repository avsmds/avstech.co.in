"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authstore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlogStore } from '@/stores/blogstore';
import { Badge } from "@/components/ui/badge"; 
import { 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  Users, 
  Loader2,
  User,
  Shield,
  Save,
  Plus,
  Trash2,
  FileText,
  Laptop,
  Smartphone,
  Globe,
  // New Icons
  Image as ImageIcon,
  Copy,
  Check
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function DashboardPage() {
  
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'settings'>('overview');
  const [isCreating, setIsCreating] = useState(false);
  
  // Auth Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Store Selectors
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const initAuth = useAuthStore((state) => state.initAuth);
  const logout = useAuthStore((state) => state.logout);
  const updateName = useAuthStore((state) => state.updateName);
  const updateEmail = useAuthStore((state) => state.updateEmail);
  const updatePassword = useAuthStore((state) => state.updatePassword);
  
  // Session Selectors
  const sessions = useAuthStore((state) => state.sessions);
  const fetchSessions = useAuthStore((state) => state.fetchSessions);
  const revokeSession = useAuthStore((state) => state.revokeSession);

  // Blog Selectors
  const { posts, fetchPosts, createPost, deletePost, uploadImage, loading: blogLoading } = useBlogStore();

  // Local Blog State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  
  // --- NEW: Image Upload State ---
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Initialize & Protect Route
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 2. Populate Forms on Load
  useEffect(() => {
    if (user) {
      const parts = user.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(user.email);
    }
  }, [user]);

  // 3. Fetch Data based on Tabs
  useEffect(() => {
    if (activeTab === 'posts') fetchPosts();
    if (activeTab === 'settings') fetchSessions();
  }, [activeTab, fetchPosts, fetchSessions]);

  // --- Handlers ---

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      if (user && fullName !== user.name) await updateName(fullName);
      if (user && email !== user.email) {
        if (!confirmPassword) throw new Error("Current password required to change email.");
        await updateEmail(email, confirmPassword);
        setConfirmPassword(""); 
      }
      setStatusMsg({ type: 'success', text: "Profile updated successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || "Update failed." });
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    try {
      if (!currentPassword || !newPassword) throw new Error("Both password fields are required.");
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setStatusMsg({ type: 'success', text: "Password changed successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || "Password update failed." });
    }
  };

  // --- NEW: Handle Image Selection ---
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      
      // Optional: Auto-upload upon selection to give the user the link immediately
      try {
        const url = await uploadImage(file);
        setUploadedImageUrl(url);
      } catch (error) {
        alert("Failed to upload image preview");
      }
    }
  };

  const copyToClipboard = () => {
    if (uploadedImageUrl) {
        const markdown = `![Cover Image](${uploadedImageUrl})`;
        navigator.clipboard.writeText(markdown);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalCoverUrl = uploadedImageUrl;

    // If file selected but upload failed/didn't happen yet for some reason
    if (coverImageFile && !finalCoverUrl) {
       finalCoverUrl = await uploadImage(coverImageFile);
    }

    await createPost({ 
        title, 
        excerpt, 
        content, 
        coverImage: finalCoverUrl 
    });
    
    // Reset Form
    setIsCreating(false);
    setTitle(''); setExcerpt(''); setContent('');
    setCoverImageFile(null);
    setUploadedImageUrl('');
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getDeviceIcon = (deviceType: string) => {
    if (deviceType.toLowerCase().includes('desktop') || deviceType.toLowerCase().includes('mac') || deviceType.toLowerCase().includes('windows')) return <Laptop className="w-5 h-5 text-muted-foreground" />;
    if (deviceType.toLowerCase().includes('phone') || deviceType.toLowerCase().includes('android') || deviceType.toLowerCase().includes('ios')) return <Smartphone className="w-5 h-5 text-muted-foreground" />;
    return <Globe className="w-5 h-5 text-muted-foreground" />;
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-bold tracking-tight text-xl">AVSTECH</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant={activeTab === 'overview' ? "secondary" : "ghost"} className="w-full justify-start font-medium" onClick={() => setActiveTab('overview')}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button variant={activeTab === 'posts' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('posts')}>
            <FileText className="mr-2 h-4 w-4" /> Posts
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Users className="mr-2 h-4 w-4" /> Team
          </Button>
          <Button variant={activeTab === 'settings' ? "secondary" : "ghost"} className="w-full justify-start font-medium" onClick={() => setActiveTab('settings')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <div className="p-4 border-t border-border">
           <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold mr-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-red-500" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/50">
          <h2 className="text-lg font-bold capitalize">{activeTab}</h2>
        </header>

        <div className="flex-1 overflow-auto p-8">
           {statusMsg && (
            <div className={`mb-6 p-4 rounded-md border ${statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {statusMsg.text}
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-black tracking-tighter mb-2">Welcome back, {firstName}!</h1>
                <p className="text-muted-foreground">Here is your project summary.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-4">
                <Card><CardHeader><CardTitle>Total Posts</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{posts.length}</CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+2350</div></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Sales</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+12k</div></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+573</div></CardContent></Card>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
             <div className="max-w-4xl mx-auto">
               <div className="flex justify-between items-center mb-8">
                <div><h1 className="text-3xl font-black">Blog Posts</h1><p className="text-muted-foreground">Manage your content.</p></div>
                <Button onClick={() => setIsCreating(!isCreating)}>{isCreating ? 'Cancel' : <><Plus className="mr-2 h-4 w-4" /> New Post</>}</Button>
               </div>
               
               {isCreating && (
                 <Card className="mb-8 border-primary">
                    <CardHeader><CardTitle>Write New Post</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <Input placeholder="Post Title" value={title} onChange={e => setTitle(e.target.value)} required />
                            <Input placeholder="Short Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
                            
                            {/* --- NEW: Image Upload UI --- */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center"><ImageIcon className="w-4 h-4 mr-2"/> Cover Image</label>
                                <div className="flex items-center gap-4">
                                    <Input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        ref={fileInputRef}
                                        className="w-full cursor-pointer"
                                    />
                                    {blogLoading && !uploadedImageUrl && coverImageFile && <Loader2 className="animate-spin w-4 h-4" />}
                                </div>
                                {uploadedImageUrl && (
                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md border border-border mt-2">
                                        <div className="flex items-center gap-2 truncate">
                                            <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0 border border-border">
                                                <img src={uploadedImageUrl} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">{uploadedImageUrl}</span>
                                        </div>
                                        <Button type="button" size="sm" variant="ghost" onClick={copyToClipboard}>
                                            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            <span className="ml-2 sr-only">Copy Markdown</span>
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Textarea placeholder="Content (Markdown supported)..." className="min-h-[200px] font-mono" value={content} onChange={e => setContent(e.target.value)} required />
                            <Button type="submit" disabled={blogLoading}>{blogLoading ? 'Publishing...' : 'Publish Post'}</Button>
                        </form>
                    </CardContent>
                 </Card>
               )}
               
               <div className="grid gap-4">
                {posts.map((post) => (
                    <Card key={post.$id} className="hover:border-primary transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div><CardTitle>{post.title}</CardTitle><CardDescription>/{post.slug}</CardDescription></div>
                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deletePost(post.$id)}><Trash2 className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                            {post.coverImage && (
                                <div className="mt-2 text-xs text-blue-500 flex items-center">
                                    <ImageIcon className="w-3 h-3 mr-1" /> Image attached
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
               </div>
             </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-3xl font-black tracking-tighter mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your profile and security.</p>
              </div>

              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><User className="mr-2 w-5 h-5"/> Profile Information</CardTitle>
                  <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent>
                   <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><label className="text-sm font-medium">First Name</label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                      <div className="space-y-2"><label className="text-sm font-medium">Last Name</label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                    </div>
                    <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /></div>
                    {user.email !== email && (
                       <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                         <label className="text-sm font-bold text-yellow-800 block mb-2">Current Password (Required for Email Change)</label>
                         <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                       </div>
                    )}
                    <Button type="submit" disabled={loading}><Save className="w-4 h-4 mr-2"/> Save Profile</Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Laptop className="mr-2 w-5 h-5"/> Active Sessions</CardTitle>
                  <CardDescription>Manage devices currently logged into your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.$id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-secondary rounded-full">
                            {getDeviceIcon(session.clientType)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {session.osName} {session.osVersion} — {session.clientName}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                               <span>{session.ip}</span>
                               <span>•</span>
                               <span>{session.countryName !== 'Unknown' ? session.countryName : 'Unknown Location'}</span>
                               <span>•</span>
                               <span>{new Date(session.$createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {session.current ? (
                            <div className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                              Current Device
                            </div>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => revokeSession(session.$id)}>
                              Revoke
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {sessions.length === 0 && <p className="text-sm text-muted-foreground">Loading sessions...</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Security Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Shield className="mr-2 w-5 h-5"/> Security</CardTitle>
                  <CardDescription>Update your password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <Button type="submit" variant="secondary" disabled={loading}>Update Password</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}