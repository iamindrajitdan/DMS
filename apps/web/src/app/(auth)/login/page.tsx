"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FileText, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password }) as any;
      if (response.success) {
        localStorage.setItem("access_token", response.data.access_token);
        window.location.href = "/dashboard";
      } else {
        setError("Invalid response received from authentication service.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Authentication failed. Check credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-zinc-950 text-zinc-100 font-sans">
      <div className="px-6 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
      </div>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl">
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              NextGen DMS Console
            </h1>
            <p className="text-xs text-zinc-400">
              Sign in with your organization credentials
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-md border border-red-900/50 bg-red-950/40 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label htmlFor="email-address" className="block text-xs font-medium text-zinc-300 mb-1">
                  Corporate Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-zinc-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus:outline-none disabled:opacity-50"
            >
              {submitting ? "Authenticating..." : "Sign in to Organization"}
            </button>
          </form>

          <div className="border-t border-zinc-800 pt-4 text-center text-[11px] text-zinc-400">
            Role-based authentication &bull; Protected by TLS 1.3
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-zinc-400">
        <div className="flex items-center justify-center gap-4">
          <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </Link>
          <span>&bull;</span>
          <Link href="/terms" className="hover:text-zinc-300 transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
