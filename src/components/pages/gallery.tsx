"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["All", "Architecture", "Development", "Branding"];

const projects = [
  { id: 1, title: "Neon Skyline", category: "Architecture", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", size: "tall" },
  { id: 2, title: "Cyber FinTech", category: "Development", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", size: "small" },
  { id: 3, title: "Mono Brand", category: "Branding", image: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?w=800&q=80", size: "small" },
  { id: 4, title: "Eco Tower", category: "Architecture", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", size: "wide" },
  { id: 5, title: "Data Hive", category: "Development", image: "https://images.unsplash.com/photo-1558494949-ef526b00fa43?w=800&q=80", size: "tall" },
];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
           <span className="h-[2px] w-12 bg-border mb-6"></span>
           <h1 className="text-6xl font-black tracking-tighter mb-8">SELECTED WORKS</h1>
           
           {/* Filter Tabs */}
           <div className="flex flex-wrap justify-center gap-2">
             {categories.map(cat => (
               <Button
                 key={cat}
                 variant={activeFilter === cat ? "default" : "outline"}
                 onClick={() => setActiveFilter(cat)}
                 className="rounded-full px-6"
               >
                 {cat}
               </Button>
             ))}
           </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
           {filteredProjects.map((item, i) => (
             <div 
                key={item.id} 
                className={cn(
                  "relative group overflow-hidden rounded-sm border border-border bg-muted",
                  item.size === "tall" ? "md:row-span-2" : "",
                  item.size === "wide" ? "md:col-span-2" : ""
                )}
             >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                   <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{item.category}</span>
                   <h3 className="text-2xl font-black tracking-tight text-center">{item.title}</h3>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}