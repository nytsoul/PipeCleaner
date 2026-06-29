"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Shield, KeyRound, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_NAME } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Admin access denied.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center rounded-2xl bg-accent p-4 text-accent-foreground shadow-lg">
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-secondary-foreground">
            {SITE_NAME} Admin
          </h1>
          <p className="mt-2 text-sm text-secondary-foreground/60">
            Secure login for authorized personnel only
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-secondary-foreground">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-foreground/40" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pipebloom.com"
                  className="pl-10 rounded-xl h-12 border-white/20 bg-white/10 text-secondary-foreground placeholder:text-secondary-foreground/30 focus-visible:ring-accent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-secondary-foreground">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-foreground/40" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 rounded-xl h-12 border-white/20 bg-white/10 text-secondary-foreground placeholder:text-secondary-foreground/30 focus-visible:ring-accent"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>
        </div>
        
        <div className="text-center text-xs text-secondary-foreground/40">
          <p>Unauthorised access is strictly prohibited.</p>
          <Link href="/" className="mt-4 inline-block hover:text-accent transition-colors">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
