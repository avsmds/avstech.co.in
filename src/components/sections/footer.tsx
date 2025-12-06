"use client";

import {
  Linkedin,
  Twitter,
  Github,
  Instagram,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Web Development", href: "#" },
      { name: "Mobile App Development", href: "#" },
      { name: "AI & Machine Learning", href: "#" },
      { name: "Digital Marketing & SEO", href: "#" },
      { name: "Industrial ERP Solutions", href: "#" },
    ],
    company: [
      { name: "About AVSTECH", href: "#" },
      { name: "Our Process", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-background text-foreground border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-foreground flex items-center justify-center rounded-sm">
                <span className="text-background font-black text-lg">Z</span>
              </div>
              <div>
                <h3 className="font-black text-2xl tracking-tighter text-foreground">
                  AVSTECH
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-sm">
              Innovating Today, Intelligence for Tomorrow. Your digital growth partner bridging the gap between local industry and global technology.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" /> 
                <span>Nashik, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> 
                <a href="mailto:hello@AVSTECH.com">AVSTECHinc@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> 
                <a href="tel:+910000000000">+91 7058351255</a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {/* Services Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-6 text-muted-foreground font-bold">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 group transition-colors"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-6 text-muted-foreground font-bold">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 group transition-colors"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-6 text-muted-foreground font-bold">
                Legal & Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 group transition-colors"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-sm text-muted-foreground">
            © {currentYear} AVSTECH. All rights reserved.
          </span>
          <div className="flex gap-4">
            {[Linkedin, Twitter, Github, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all rounded-sm"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}