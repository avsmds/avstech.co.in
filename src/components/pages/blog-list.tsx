'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogStore } from '@/stores/blogstore';
import { format } from 'date-fns';
import { ArrowRight, FileText } from 'lucide-react'; // Added icons
import { cn } from "@/lib/utils"; // Assuming you have a utility for cn/clsx

export default function BlogIndex() {
    const { posts, fetchPosts, loading } = useBlogStore();

    useEffect(() => { fetchPosts(); }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground"><div className="text-xl">Loading stories...</div></div>;
    
    const heroPost = posts[0];
    const morePosts = posts.slice(1);

    return (
        // Switched to dark background and foreground text
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            
            {/* Navigation */}
            <nav className="border-b border-border px-6 py-5 flex justify-between items-center bg-card/50 backdrop-blur-sm">
                <Link href="/" className="font-black tracking-tight text-2xl">AVSTECH Blog</Link>
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                </Link>
            </nav>

            <main className="container mx-auto px-6 max-w-7xl pb-32">
                {/* Hero Post (First one) */}
                {heroPost && (
                    <section className="mb-20 mt-24 border-b border-border/50 pb-16">
                        <div className="grid lg:grid-cols-2 lg:gap-x-16 gap-y-12">
                            
                            {/* Left: Image */}
                            <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border shadow-2xl">
                                {heroPost.coverImage ? (
                                    <Image
                                        src={heroPost.coverImage}
                                        alt={heroPost.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-muted/20 text-muted-foreground/50">
                                        <FileText className="w-10 h-10" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            
                            {/* Right: Content */}
                            <div>
                                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
                                    <span className="h-[2px] w-12 bg-primary"></span>
                                    {format(new Date(heroPost.$createdAt), 'MMMM d, yyyy')}
                                </div>
                                
                                <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                                    <Link href={`/blog-list/${heroPost.slug}`} className="hover:text-primary transition-colors">
                                        {heroPost.title}
                                    </Link>
                                </h1>
                                
                                <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                                    {heroPost.excerpt}
                                </p>

                                <Link href={`/blog-list/${heroPost.slug}`} className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 group">
                                    Read Story
                                    <ArrowRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* More Stories Grid */}
                {morePosts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-12 text-5xl md:text-6xl font-black tracking-tighter leading-tight">
                            More Stories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                            {morePosts.map((post) => (
                                <div key={post.$id} className="group">
                                    {/* Image Placeholder/Thumbnail */}
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border mb-6">
                                        {post.coverImage ? (
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-muted/20 text-muted-foreground/50">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold leading-snug mb-2">
                                        <Link href={`/blog-list/${post.slug}`} className="hover:text-primary transition-colors">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                        {format(new Date(post.$createdAt), 'MMMM d, yyyy')}
                                    </div>
                                    <p className="text-base text-foreground/80 leading-relaxed mb-4">{post.excerpt}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {posts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">No posts published yet.</div>
                )}
            </main>
        </div>
    );
}