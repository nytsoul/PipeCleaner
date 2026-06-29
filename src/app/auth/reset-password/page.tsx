"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Flower2, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
        <XCircle className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h2 className="font-heading text-2xl font-bold mb-2">Invalid Link</h2>
        <p className="text-muted-foreground mb-8">
          The password reset link is invalid or missing the token.
        </p>
        <Button asChild className="w-full rounded-xl h-12">
          <Link href="/auth/forgot-password">Request New Link</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h2 className="font-heading text-2xl font-bold mb-2">Password Reset</h2>
        <p className="text-muted-foreground mb-8">
          Your password has been updated successfully. Redirecting to login...
        </p>
        <Button asChild className="w-full rounded-xl h-12">
          <Link href="/auth/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            New Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="rounded-xl h-12"
            required
            minLength={8}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Confirm New Password
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            className="rounded-xl h-12"
            required
            minLength={8}
          />
        </div>

        <Button type="submit" className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-8 flex items-center justify-center rounded-2xl bg-primary p-3 text-primary-foreground shadow-lg">
            <Flower2 className="h-8 w-8" />
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Create New Password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your new password below to regain access to your account.
          </p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
