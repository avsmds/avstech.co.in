"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, AlertTriangle } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden p-6">
       {/* Background Grid */}
       <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 text-destructive rounded-full mb-6 border border-destructive/20">
            <AlertTriangle className="w-10 h-10" />
        </div>
        
        <h1 className="text-9xl font-black tracking-tighter text-foreground/10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
            404
        </h1>

        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
          SYSTEM <br /> FAILURE
        </h2>

        <div className="h-[2px] w-24 bg-destructive mx-auto my-6" />

        <p className="text-xl text-muted-foreground">
          The coordinates you are trying to access do not exist in our database. 
          Return to base immediately.
        </p>

        <div className="pt-8">
          <Link href="/">
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-sm">
              <MoveLeft className="mr-2 w-5 h-5" /> Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}