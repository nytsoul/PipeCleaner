"use client";

import { motion } from "motion/react";
import { HandHeart, Leaf, Truck, ShieldCheck } from "lucide-react";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/animations";

const uspItems = [
  {
    icon: HandHeart,
    title: "100% Handmade",
    description: "Every piece crafted with love and precision by skilled artisans",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable materials with minimal environmental impact",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Ships within 3-5 business days across India",
    color: "text-accent-orange",
    bg: "bg-accent-orange/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% safe and encrypted payment processing",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export function UspBanner() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {uspItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="group text-center"
            >
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className={`h-7 w-7 ${item.color}`} />
              </div>
              <h3 className="mb-2 font-heading text-sm font-bold text-foreground sm:text-base">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
