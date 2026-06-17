"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">Check your email</h1>
          <p className="text-sm text-text-secondary">
            We&apos;ve sent a confirmation link to{" "}
            <span className="text-text-primary font-medium">{email}</span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-secondary p-6">
          <p className="text-sm text-text-secondary text-center leading-relaxed">
            Click the link in the email to activate your account, then come back and sign in.
          </p>
        </div>
        <p className="text-center text-sm text-text-tertiary">
          <Link
            href="/login"
            className="font-medium transition-colors"
            style={{ color: "var(--accent-text)" }}
          >
            Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
        <p className="text-sm text-text-secondary">
          Start tracking your trading journey
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border bg-bg-secondary p-6 space-y-5"
      >
        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Email */}
        <Input
          id="signup-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />

        {/* Password */}
        <Input
          id="signup-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 6 characters"
          required
          autoComplete="new-password"
        />

        {/* Confirm Password */}
        <Input
          id="signup-confirm-password"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
          required
          autoComplete="new-password"
        />

        {/* Submit */}
        <Button type="submit" isLoading={loading}>
          Create account
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-text-tertiary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium transition-colors"
          style={{ color: "var(--accent-text)" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
