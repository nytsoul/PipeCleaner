"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/animations";
import { featuredCategories } from "@/data/categories";
import { SectionHeader } from "@/components/shared/section-header";

export function CategoriesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Categories"
          title="Shop by Category"
          description="Explore our curated collection of handcrafted pipe cleaner creations"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
        >
          {featuredCategories.map((category) => (
            <motion.div key={category.slug} variants={fadeInUp}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group relative flex h-40 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-muted p-6 ring-1 ring-foreground/5 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 sm:h-48 lg:h-56"
              >
                {/* Icon Background */}
                <div className="absolute top-4 right-4 text-5xl opacity-30 transition-all duration-500 group-hover:scale-125 group-hover:opacity-50 sm:text-6xl">
                  {category.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {category.productCount} products
                  </p>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
