"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authstore";
import { useBlogStore } from "@/stores/blogstore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const { posts, fetchPosts } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-black tracking-tighter mb-2">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">Here is your project summary.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {posts.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12k</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}