import Link from "next/link";
import { Shield, KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_NAME } from "@/lib/constants";

export default function AdminLoginPage() {
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
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-secondary-foreground">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-foreground/40" />
                <Input
                  id="email"
                  type="email"
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
                  placeholder="••••••••"
                  className="pl-10 rounded-xl h-12 border-white/20 bg-white/10 text-secondary-foreground placeholder:text-secondary-foreground/30 focus-visible:ring-accent"
                  required
                />
              </div>
            </div>

            <Button asChild className="h-12 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/admin">
                Access Dashboard
              </Link>
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
