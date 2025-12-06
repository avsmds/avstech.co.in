// app/(public)/layout.tsx

import { Sidebar } from "@/components/sections/sidebar";
import React from 'react';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0 relative">
                    {children}
            </main>
        </div>
    );
}