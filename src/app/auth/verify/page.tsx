"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flower2, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to verify email");
        }

        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verifyToken();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="rounded-3xl border border-border bg-card p-12 shadow-sm text-center">
        <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Verifying your email...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
        <XCircle className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h2 className="font-heading text-2xl font-bold mb-2">Verification Failed</h2>
        <p className="text-muted-foreground mb-8">{message}</p>
        <Button asChild className="w-full rounded-xl h-12">
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-6" />
      <h2 className="font-heading text-2xl font-bold mb-2">Email Verified!</h2>
      <p className="text-muted-foreground mb-8">
        Your email address has been successfully verified. You can now access all features of your account.
      </p>
      <Button asChild className="w-full rounded-xl h-12">
        <Link href="/auth/login">Continue to Login</Link>
      </Button>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-8 flex items-center justify-center rounded-2xl bg-primary p-3 text-primary-foreground shadow-lg">
            <Flower2 className="h-8 w-8" />
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Email Verification
          </h1>
        </div>

        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
          <VerifyEmailContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
