"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Briefcase,
  Users,
  FolderKanban,
  MessageSquare,
  ArrowUpRight,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Menu,
  type LucideIcon,
} from "lucide-react";

// --- Types ---
interface SidebarProps {
  activeSection?: string;
  className?: string;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  section: string;
}

// --- Configuration ---
const NAVIGATION_ITEMS: NavItem[] = [
  { icon: Home, label: "Home", href: "#", section: "hero" },
  { icon: Briefcase, label: "Services", href: "#services", section: "services" },
  { icon: Users, label: "Why Us", href: "#why-us", section: "why-us" },
  { icon: FolderKanban, label: "Projects", href: "#projects", section: "projects" },
  { icon: MessageSquare, label: "Contact", href: "#contact", section: "contact" },
];

// --- Sub-Components (Memoized for Performance) ---

const Logo = React.memo(({ showText = true }: { showText?: boolean }) => (
  <Link href="/" className="flex items-center gap-3 group focus:outline-none">
    <div className="w-8 h-8 shrink-0 bg-sidebar-foreground flex items-center justify-center transition-transform group-hover:rotate-180 duration-500 rounded-sm">
      <span className="text-sidebar font-black text-sm">A</span>
    </div>
    {showText && (
      <div className="transition-opacity duration-300">
        <h1 className="font-black text-lg tracking-tighter whitespace-nowrap text-sidebar-foreground">
          AVSTECH
        </h1>
        <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
          INC
        </p>
      </div>
    )}
  </Link>
));
Logo.displayName = "Logo";

interface NavLinksProps {
  items: NavItem[];
  activeSection?: string;
  collapsed?: boolean;
  onItemClick?: () => void;
}

const NavLinks = React.memo(({ items, activeSection, collapsed = false, onItemClick }: NavLinksProps) => (
  <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-sidebar-border">
    <TooltipProvider delayDuration={0}>
      {items.map((item) => {
        const isActive = activeSection === item.section;
        
        const LinkContent = (
          <Link
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "group flex items-center gap-3 py-3 px-3 transition-all duration-300 rounded-md outline-none ring-sidebar-ring focus-visible:ring-2",
              isActive
                ? "bg-sidebar-accent text-sidebar-foreground font-medium shadow-sm"
                : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
              collapsed ? "justify-center" : ""
            )}
          >
            <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-primary" : "group-hover:text-sidebar-foreground")} />
            {!collapsed && (
              <span className="text-sm tracking-wide whitespace-nowrap animate-in fade-in duration-300">
                {item.label}
              </span>
            )}
            <span className="sr-only">{item.label}</span>
          </Link>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
              <TooltipContent side="right" className="bg-sidebar-foreground text-sidebar font-bold">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        }

        return <React.Fragment key={item.label}>{LinkContent}</React.Fragment>;
      })}
    </TooltipProvider>
  </nav>
));
NavLinks.displayName = "NavLinks";

const FooterContent = React.memo(({ collapsed = false }: { collapsed?: boolean }) => (
  <div className={cn("mt-auto", collapsed ? "flex justify-center" : "")}>
    {collapsed ? (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" className="bg-sidebar-primary hover:bg-sidebar-primary/90 shadow-md">
              <ArrowUpRight className="w-4 h-4" />
              <span className="sr-only">Start Project</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Start Project</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Button className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 font-bold h-12 rounded-md shadow-sm whitespace-nowrap transition-transform active:scale-95">
        Start Project <ArrowUpRight className="ml-2 w-4 h-4" />
      </Button>
    )}
  </div>
));
FooterContent.displayName = "FooterContent";

// --- Main Component ---

export function Sidebar({ activeSection = "hero", className }: SidebarProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Handle Hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Responsive Collapse
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width >= 1024) {
        setIsCollapsed(true);
      } else if (width >= 1280) {
        setIsCollapsed(false);
      }
    };

    // Initial check
    handleResize();
    
    // Debounce could be added here for performance, but native resize is usually fine for this logic
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <>
      {/* --- MOBILE HEADER (Visible < lg) --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 shadow-sm transition-all">
        <Logo showText={true} />

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-border">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="p-0 w-[280px] bg-sidebar text-sidebar-foreground border-l border-sidebar-border flex flex-col"
            >
              <SheetHeader className="h-16 flex items-center px-6 border-b border-sidebar-border shrink-0">
                <SheetTitle className="w-full text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col flex-1 h-full overflow-hidden">
                <NavLinks 
                  items={NAVIGATION_ITEMS} 
                  activeSection={activeSection} 
                  onItemClick={() => setIsMobileOpen(false)} 
                />
                <div className="p-4 border-t border-sidebar-border mt-auto">
                  <FooterContent collapsed={false} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* --- DESKTOP SIDEBAR (Visible >= lg) --- */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-xl transition-[width] duration-300 ease-in-out will-change-[width]",
          isCollapsed ? "w-[80px]" : "w-72",
          className
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "h-20 flex items-center px-4 border-b border-sidebar-border shrink-0 transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <Logo showText={!isCollapsed} />

          {!isCollapsed && mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <NavLinks 
          items={NAVIGATION_ITEMS} 
          activeSection={activeSection} 
          collapsed={isCollapsed} 
        />

        {/* Footer & Collapse Toggle */}
        <div className="border-t border-sidebar-border shrink-0">
          <div className="p-4">
            <FooterContent collapsed={isCollapsed} />
          </div>
          
          <div
            className={cn(
              "h-12 flex items-center bg-sidebar-accent/10 transition-all duration-300",
              isCollapsed ? "justify-center" : "justify-end px-2"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}