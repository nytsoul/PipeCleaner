"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { SectionHeader } from "@/components/shared/section-header";
import { motion } from "motion/react";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="All Categories"
        description="Explore our wide range of handcrafted pipe cleaner gifts"
        align="center"
      />
      
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link 
              href={`/shop?category=${category.slug}`}
              className="group relative flex h-72 w-full flex-col justify-end overflow-hidden rounded-3xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-6 flex items-end justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-2 max-w-[200px]">
                    {category.description}
                  </p>
                </div>
                
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
