import Link from "next/link";
import { FileText, Database, Shield, Lock } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200">
            <FileText className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm tracking-tight">NextGen DMS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <Link href="/#architecture" className="transition-colors hover:text-zinc-200">
            Architecture
          </Link>
          <Link href="/#features" className="transition-colors hover:text-zinc-200">
            System Features
          </Link>
          <Link href="/#security" className="transition-colors hover:text-zinc-200">
            Security & RBAC
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-zinc-200">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-200">
            Terms & Conditions
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
          >
            Open Console
          </Link>
        </div>
      </div>
    </header>
  );
}
