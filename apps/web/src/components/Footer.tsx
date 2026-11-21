import Link from "next/link";
import { FileText, Shield, Database, Lock, Server } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold text-zinc-200 tracking-tight">NextGen DMS</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Enterprise document storage and metadata indexing engine. Built for high security, granular role-based access control, and scalable object storage.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Self-Hosted &bull; Core v1.0.0</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Product & Systems</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-zinc-200">
                  Document Console
                </Link>
              </li>
              <li>
                <Link href="/documents" className="transition-colors hover:text-zinc-200">
                  Document Explorer
                </Link>
              </li>
              <li>
                <Link href="/#architecture" className="transition-colors hover:text-zinc-200">
                  Storage & Database Architecture
                </Link>
              </li>
              <li>
                <Link href="/#features" className="transition-colors hover:text-zinc-200">
                  Metadata Schema Specifications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Technical Foundation</h3>
            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Database className="h-3 w-3 text-zinc-400" />
                <span>PostgreSQL 15 (Metadata & RBAC)</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="h-3 w-3 text-zinc-400" />
                <span>S3 / MinIO Object Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-zinc-400" />
                <span>Redis 7 (Session & Cache)</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-3 w-3 text-zinc-400" />
                <span>Direct Presigned S3 Uploads</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Legal & Governance</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-zinc-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-zinc-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition-colors hover:text-zinc-200">
                  Organization Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-400">
            &copy; 2026 NextGen DMS. All rights reserved. Self-hosted enterprise document management.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400">Zero Third-Party Trackers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
