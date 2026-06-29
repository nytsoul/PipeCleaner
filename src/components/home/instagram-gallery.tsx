"use client";

import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { motion } from "motion/react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Mock Instagram Posts (reusing product images for demonstration)
const instagramPosts = [
  { id: 1, image: "/images/sunflower-bouquet.jpg", likes: 245, comments: 12 },
  { id: 2, image: "/images/teddy-bear.jpg", likes: 512, comments: 34 },
  { id: 3, image: "/images/tulip-pot.jpg", likes: 189, comments: 8 },
  { id: 4, image: "/images/sunflower-bouquet.jpg", likes: 432, comments: 21 },
  { id: 5, image: "/images/tulip-pot.jpg", likes: 310, comments: 15 },
];

export function InstagramGallery() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Join Our Community"
          description="Follow us on Instagram @pipebloom for daily inspiration and behind-the-scenes"
          align="center"
        />

        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-muted ${
                  index > 3 ? "hidden md:block" : ""
                }`}
              >
                <Image
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Heart className="h-5 w-5 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <MessageCircle className="h-5 w-5 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                
                {/* Always visible IG icon in corner */}
                <div className="absolute top-3 right-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  <InstagramIcon className="h-5 w-5 text-white drop-shadow-md" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
