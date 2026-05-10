"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight hover:text-accent transition-colors"
            >
              MC KINLY BONGADILLO
            </Link>
            <p className="text-muted-foreground mt-2">
              Creative Director & Video Editor
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MC KINLY BONGADILLO. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with intention. Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
