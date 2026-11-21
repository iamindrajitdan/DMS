"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FileText, Database, Shield, LogOut, ArrowRight, Folder, Clock, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400 font-mono text-xs">
        Loading organization profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col">
      {/* Top Console Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200">
                <FileText className="h-4 w-4" />
              </div>
              <span>NextGen DMS</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono text-zinc-400">Organization Console</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/documents"
              className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              Document Explorer
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-8">
        <header className="mb-8 border-b border-zinc-800 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">Console Overview</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Signed in as: <span className="text-zinc-200">{user?.email || "User"}</span> (Role: {user?.role || "Staff Member"})
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">Repository Documents</h2>
              <Folder className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-bold text-white">Active Repository</p>
            <p className="text-xs text-zinc-400">
              Access and manage organizational documents, metadata attributes, and presigned uploads.
            </p>
            <div className="pt-2">
              <Link
                href="/documents"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-200 hover:underline"
              >
                <span>Open Document Explorer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">Storage Health</h2>
              <Database className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-bold text-emerald-400">Connected</p>
            <p className="text-xs text-zinc-400">
              Object storage backend (S3/MinIO) and PostgreSQL metadata indexing operational.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-400">
              SHA-256 integrity checks enabled
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">Access Scope</h2>
              <Shield className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-bold text-white">Enforced</p>
            <p className="text-xs text-zinc-400">
              Role-based access permissions and organization partitioning are actively validated.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-400">
              Tenant ID: {user?.organizationId || "Default"}
            </div>
          </div>
        </div>

        {/* Quick System Action */}
        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Document Management Operations</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Upload new documents, query metadata attributes, and download authorized files.
              </p>
            </div>
            <Link
              href="/documents"
              className="rounded-md bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
            >
              Go to Documents
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950 py-4 px-6 text-xs text-zinc-400">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NextGen DMS &bull; v1.0.0 Self-Hosted</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-300">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
