"use client";

import Link from "next/link";
import {
  Flower2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SITE_NAME,
  SITE_TAGLINE,
  FOOTER_LINKS,
  CONTACT_INFO,
} from "@/lib/constants";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Flower2 className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-secondary-foreground/70">
              {SITE_TAGLINE}. Spreading happiness through handmade pipe cleaner
              gifts crafted with creativity, love, and attention to detail.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/pipebloom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-secondary-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/pipebloom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-secondary-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/pipebloom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-secondary-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-accent">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  {CONTACT_INFO.email}
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  {CONTACT_INFO.phone}
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {CONTACT_INFO.address}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold">Newsletter</h4>
              <p className="mb-3 text-xs text-secondary-foreground/60">
                Get 10% off your first order!
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-9 border-white/20 bg-white/10 text-sm text-secondary-foreground placeholder:text-secondary-foreground/40 focus-visible:ring-accent"
                />
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 h-9 px-4">
                  Join
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-secondary-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Made with ❤️ in India.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
