"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    value: CONTACT_INFO.email,
    description: "We reply within 24 hours",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: CONTACT_INFO.phone,
    description: "Mon-Sat, 10AM-6PM IST",
    color: "text-accent-orange",
    bg: "bg-accent-orange/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: CONTACT_INFO.address,
    description: "By appointment only",
    color: "text-success",
    bg: "bg-success/10",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-muted py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="mb-4 inline-block rounded-full bg-accent/15 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-primary">
              Get in Touch
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Have a question, custom order request, or just want to say hello? 
              We&apos;re here to help!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Contact Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 grid gap-6 sm:grid-cols-3"
        >
          {contactCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              className="rounded-2xl bg-card p-6 text-center ring-1 ring-foreground/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
              >
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <h3 className="mb-1 font-heading text-base font-bold text-foreground">
                {card.title}
              </h3>
              <p className="mb-1 text-sm font-medium text-foreground">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-card p-8 ring-1 ring-foreground/5 sm:p-10"
          >
            <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
              Send Us a Message
            </h2>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Your Name" className="h-11 rounded-xl" />
                <Input type="email" placeholder="Your Email" className="h-11 rounded-xl" />
              </div>
              <Input placeholder="Subject" className="h-11 rounded-xl" />
              <Textarea
                placeholder="Your Message..."
                className="min-h-[150px] rounded-xl"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-xl bg-primary gap-2"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
