"use client";

import { motion } from "motion/react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fadeInUp, viewportOnce } from "@/lib/animations";

export function Newsletter() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Decorative */}
          <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-accent/10 blur-[80px]" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-accent-orange/10 blur-[100px]" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white/90">
              <Send className="h-3 w-3" />
              Stay Updated
            </div>

            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Get 10% Off Your First Order
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/60">
              Subscribe to our newsletter for exclusive deals, new arrivals, and
              handcrafted inspiration delivered to your inbox.
            </p>

            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-xl border-white/20 bg-white/15 text-white placeholder:text-white/40 focus-visible:ring-accent"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 rounded-xl bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-4 text-[11px] text-white/40">
              No spam, unsubscribe anytime. Use code FIRST15 for 15% off.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
