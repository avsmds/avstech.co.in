'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogStore } from '@/stores/blogstore';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react'; // Added icon

export default function BlogPost() {
    const { slug } = useParams();
    const { currentPost, getPostBySlug, loading } = useBlogStore();

    useEffect(() => {
        if (slug) getPostBySlug(slug as string);
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground"><div className="text-xl">Loading story...</div></div>;
    if (!currentPost) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground"><div className="text-xl">Post not found.</div></div>;

    return (
        // Changed bg-white/text-black to bg-background/text-foreground
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            
            {/* Navigation Header */}
            <nav className="border-b border-border px-6 py-4 font-bold bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <Link href="/blog-list" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </nav>

            <article className="mb-32">
                <header className="max-w-4xl mx-auto mt-16 mb-16 px-6">
                    {/* Date/Metadata Accent */}
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
                        <span className="h-[2px] w-12 bg-primary"></span>
                        {format(new Date(currentPost.$createdAt), 'MMMM d, yyyy')}
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-10">
                        {currentPost.title}
                    </h1>
                    
                    {/* Cover Image */}
                    {currentPost.coverImage && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border shadow-2xl mt-12">
                            <Image
                                src={currentPost.coverImage}
                                alt={currentPost.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 800px"
                                priority
                            />
                            {/* Subtle Overlay for Contrast */}
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    )}
                </header>

                {/* Content Area */}
                <div className="max-w-2xl mx-auto px-6">
                    {/* Applying custom Tailwind classes to match the dark aesthetic */}
                    <div className="prose prose-lg dark:prose-invert 
                                   prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground
                                   prose-p:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80
                                   prose-li:text-foreground/80 prose-blockquote:border-l-primary prose-code:bg-card prose-code:text-foreground">
                        <ReactMarkdown>
                            {currentPost.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </article>
        </div>
    );
}