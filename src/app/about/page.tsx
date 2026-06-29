"use client";

import { motion } from "motion/react";
import { Heart, Leaf, Award, Palette } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Newsletter } from "@/components/home/newsletter";

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every creation is infused with passion and care, ensuring each gift carries a heartfelt touch.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "We use sustainable, recyclable materials to minimize our environmental footprint.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Premium-grade pipe cleaners and materials ensure durability and beauty.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Unique, artistic designs that stand out from mass-produced gifts.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-accent/15 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-primary">
              Our Story
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Crafting Joy,{" "}
              <span className="text-primary">One Stem at a Time</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              PipeBloom was born from a simple belief: handmade gifts carry emotions
              that mass-produced items can&apos;t replicate. We transform humble pipe
              cleaners into extraordinary works of art.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                To make handcrafted pipe cleaner gifts easily accessible through a
                beautiful online shopping experience while empowering artisans to
                showcase their creativity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in the power of handmade. Each flower, each teddy bear,
                each keychain is a testament to human creativity and the joy of
                giving something truly unique. Our artisans pour hours of love into
                every piece, and it shows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "2024", label: "Founded" },
                { value: "500+", label: "Happy Customers" },
                { value: "200+", label: "Unique Products" },
                { value: "50+", label: "5-Star Reviews" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-card p-6 text-center ring-1 ring-foreground/5"
                >
                  <div className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Values"
            title="What We Stand For"
            description="The principles that guide every creation"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="rounded-2xl bg-card p-6 text-center ring-1 ring-foreground/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="mb-2 font-heading text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 sm:p-16"
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Our Vision
            </h2>
            <p className="text-base text-white/70 leading-relaxed sm:text-lg">
              To become the leading online destination for handmade pipe cleaner
              gifts by combining creativity, quality craftsmanship, and modern
              e-commerce technology — spreading happiness, one handmade gift at
              a time.
            </p>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
