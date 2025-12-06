// app/layout.tsx (The Root Layout)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme_provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "AVSTECH Inc",
  description: "Engineering the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn("bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* The entire public/dashboard structure logic moves here: */}
          {children} 
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}