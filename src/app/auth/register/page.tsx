"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Flower2, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <div className="rounded-2xl bg-card p-8 shadow-lg ring-1 ring-foreground/5 sm:p-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h2 className="font-heading text-2xl font-bold mb-2">Check your email</h2>
            <p className="text-muted-foreground mb-8">
              We&apos;ve sent a verification link to <strong>{formData.email}</strong>. Please click the link to activate your account.
            </p>
            <Button asChild className="w-full rounded-xl">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl bg-card p-8 shadow-lg ring-1 ring-foreground/5 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Flower2 className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Join PipeBloom and discover handmade joy
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" className="h-11 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Min. 8 characters" className="h-11 rounded-xl" minLength={8} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Confirm Password</label>
              <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repeat password" className="h-11 rounded-xl" minLength={8} />
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1 rounded" />
              <span className="text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <Button type="submit" size="lg" className="h-12 w-full rounded-xl bg-primary" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
