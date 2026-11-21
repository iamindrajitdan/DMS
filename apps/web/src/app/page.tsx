import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Database, 
  ShieldCheck, 
  HardDrive, 
  Search, 
  Key, 
  Server, 
  Terminal, 
  ArrowRight, 
  Check, 
  Lock,
  Layers,
  Clock,
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="border-b border-zinc-800 bg-zinc-950 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-mono text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <span>Core v1.0.0 &bull; Self-Hosted &bull; S3 Object Storage</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
                Metadata-Driven Document Management System
              </h1>

              <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
                NextGen DMS provides structured file storage, schema-driven metadata categorization, 
                and role-based permissions for enterprise documents. Built on PostgreSQL, Redis, and S3-compatible object storage.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  Open Document Console
                </Link>
                <Link
                  href="/login"
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  Sign In to Organization
                </Link>
                <a
                  href="#architecture"
                  className="rounded-md px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  View Architecture &darr;
                </a>
              </div>
            </div>

            {/* Technical System Console Preview */}
            <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-zinc-800 border border-zinc-700"></div>
                  <div className="h-3 w-3 rounded-sm bg-zinc-800 border border-zinc-700"></div>
                  <div className="h-3 w-3 rounded-sm bg-zinc-800 border border-zinc-700"></div>
                  <span className="ml-2 font-mono text-xs text-zinc-400">console.dms.internal/explorer</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5 text-zinc-400" />
                    <span>postgres:5432/dms_db</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Server className="h-3.5 w-3.5 text-zinc-400" />
                    <span>s3://dms-bucket</span>
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Repository Files & Metadata Inspector</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Active Tenant: Organization Primary Partition (tenant-id: 8492)</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <input 
                        type="text" 
                        readOnly 
                        value="schema:FinancialAudit status:verified" 
                        className="w-full rounded-md border border-zinc-800 bg-zinc-950 pl-8 pr-3 py-1.5 text-xs text-zinc-300 font-mono"
                      />
                    </div>
                    <Link
                      href="/documents"
                      className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors shrink-0"
                    >
                      View Live Table
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400">
                        <th className="pb-3 font-medium">Document Name</th>
                        <th className="pb-3 font-medium">Schema Type</th>
                        <th className="pb-3 font-medium">Metadata Attributes</th>
                        <th className="pb-3 font-medium">Checksum (SHA-256)</th>
                        <th className="pb-3 font-medium text-right">Size</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="py-3 font-sans font-medium text-white flex items-center gap-2">
                          <FileText className="h-4 w-4 text-zinc-400" />
                          <span>2026_Q3_Financial_Audit.pdf</span>
                        </td>
                        <td className="py-3 text-zinc-400">Financial Audit</td>
                        <td className="py-3 text-zinc-400">year: 2026 &bull; status: verified &bull; clearance: restricted</td>
                        <td className="py-3 text-zinc-400">sha256:8f2a...c014</td>
                        <td className="py-3 text-right text-zinc-400">4.2 MB</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-sans font-medium text-white flex items-center gap-2">
                          <FileText className="h-4 w-4 text-zinc-400" />
                          <span>Master_Services_Agreement_2026.docx</span>
                        </td>
                        <td className="py-3 text-zinc-400">Legal Contract</td>
                        <td className="py-3 text-zinc-400">party: Acme Corp &bull; renewal: auto &bull; legal_review: passed</td>
                        <td className="py-3 text-zinc-400">sha256:d149...77a1</td>
                        <td className="py-3 text-right text-zinc-400">1.8 MB</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-sans font-medium text-white flex items-center gap-2">
                          <FileText className="h-4 w-4 text-zinc-400" />
                          <span>Infrastructure_Topology_Spec.pdf</span>
                        </td>
                        <td className="py-3 text-zinc-400">Technical Spec</td>
                        <td className="py-3 text-zinc-400">cluster: us-east-1 &bull; env: production &bull; tier: core</td>
                        <td className="py-3 text-zinc-400">sha256:39bf...e552</td>
                        <td className="py-3 text-right text-zinc-400">8.7 MB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core System Features */}
        <section id="features" className="py-20 border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                Functional Capabilities
              </h2>
              <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Engineered for High-Reliability Enterprise Workloads
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                NextGen DMS replaces unindexed file shares with a structured document repository 
                featuring strong typing, audit trails, and direct object storage streaming.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="mb-4 inline-flex rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-200">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Metadata-First Indexing</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Define schemas with structured attributes including numbers, dates, strings, and enums. Query files by business attributes rather than static folder hierarchies.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="mb-4 inline-flex rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-200">
                  <HardDrive className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Direct S3 Presigned Uploads</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Upload directly from the client to AWS S3, MinIO, or Cloudflare R2 using short-lived presigned URLs. Bypasses API memory bottlenecks and supports gigabyte-scale files.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="mb-4 inline-flex rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Role-Based Access Control</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Strict tenant isolation and user permissions. Enforce read, write, and administrative roles across departments and document classification categories.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="mb-4 inline-flex rounded-md border border-zinc-700 bg-zinc-800 p-2 text-zinc-200">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Cryptographic Verification</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Every document records a SHA-256 checksum upon storage. Verify file integrity automatically against bit rot, modification, or unauthorized alterations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture Section */}
        <section id="architecture" className="py-20 border-b border-zinc-800 bg-zinc-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                System Topology
              </h2>
              <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Modular, Self-Hosted Architecture
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                Designed to run in sovereign VPCs, on-premise clusters, or hybrid clouds with zero external service dependencies.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Layers className="h-4 w-4 text-zinc-400" />
                  <span>Frontend Application Layer</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Next.js 16 web application with server-rendered routing and client document explorers. Connects directly to the backend API via structured HTTP endpoints.
                </p>
                <div className="rounded border border-zinc-800 bg-zinc-950 p-3 font-mono text-[11px] text-zinc-400">
                  Container: apps/web<br />
                  Port: 3000 (HTTP)<br />
                  Framework: Next.js 16 + Tailwind CSS
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Server className="h-4 w-4 text-zinc-400" />
                  <span>API Core & Business Logic</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  NestJS microservice providing authentication, document metadata validation, presigned URL generation, and Prisma ORM integration.
                </p>
                <div className="rounded border border-zinc-800 bg-zinc-950 p-3 font-mono text-[11px] text-zinc-400">
                  Container: apps/api<br />
                  Port: 3001 (HTTP / REST)<br />
                  Stack: NestJS + Prisma ORM
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Database className="h-4 w-4 text-zinc-400" />
                  <span>Data Persistence Tier</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  PostgreSQL 15 for relational metadata schemas and tenancy isolation. S3/MinIO for encrypted binary objects, and Redis 7 for cache synchronization.
                </p>
                <div className="rounded border border-zinc-800 bg-zinc-950 p-3 font-mono text-[11px] text-zinc-400">
                  PostgreSQL: Port 5432<br />
                  MinIO / S3: Port 9000 &bull; Console 9001<br />
                  Redis Cache: Port 6379
                </div>
              </div>
            </div>

            {/* REST API Quickstart */}
            <div className="mt-12 rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-zinc-400" />
                  <span className="font-mono text-xs font-medium text-zinc-200">Document Upload Flow (REST Protocol)</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">Standard RFC-compliant JSON</span>
              </div>
              <div className="mt-4 font-mono text-xs text-zinc-300 space-y-3 leading-relaxed overflow-x-auto">
                <div className="text-zinc-400"># 1. Request presigned upload URL from API</div>
                <div>curl -X POST https://api.dms.internal/api/v1/documents/upload-url \</div>
                <div className="pl-4">-H &quot;Authorization: Bearer $TOKEN&quot; \</div>
                <div className="pl-4">-d &apos;&#123;&quot;filename&quot;: &quot;audit.pdf&quot;, &quot;contentType&quot;: &quot;application/pdf&quot;&#125;&apos;</div>
                <div className="text-zinc-400 pt-2"># 2. Stream binary payload directly into S3</div>
                <div>curl -X PUT &quot;$PRESIGNED_URL&quot; --upload-file ./audit.pdf -H &quot;Content-Type: application/pdf&quot;</div>
                <div className="text-zinc-400 pt-2"># 3. Commit document metadata into PostgreSQL</div>
                <div>curl -X POST https://api.dms.internal/api/v1/documents \</div>
                <div className="pl-4">-H &quot;Authorization: Bearer $TOKEN&quot; \</div>
                <div className="pl-4">-d &apos;&#123;&quot;title&quot;: &quot;Audit 2026&quot;, &quot;file&quot;: &#123;&quot;storageKey&quot;: &quot;...&quot;, &quot;checksum&quot;: &quot;...&quot;&#125;&#125;&apos;</div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & RBAC Specifications */}
        <section id="security" className="py-20 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  Compliance and Security
                </h2>
                <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Granular Role-Based Permissions and Audit Logging
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Organizations operate within strict boundaries. Every document view, download, 
                  metadata change, and deletion produces an immutable audit record for compliance review.
                </p>

                <div className="mt-8 space-y-4 text-xs text-zinc-300">
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-zinc-300">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white">Tenant Isolation:</strong> Data separation enforced at the database level with scoped queries.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-zinc-300">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white">Cryptographic Session Tokens:</strong> Stateless JSON Web Tokens (JWT) with configurable expiration.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-zinc-300">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white">Immutable Audit Logging:</strong> Capture actor identity, timestamp, IP address, and payload parameters.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-zinc-300">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white">Zero Third-Party Code:</strong> No third-party marketing tags, external fonts, or analytics beacons.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="font-semibold text-xs text-white uppercase tracking-wider font-mono">RBAC Matrix</span>
                  <span className="text-[11px] font-mono text-zinc-400">Strict Enforcement</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="rounded border border-zinc-800 bg-zinc-950 p-3">
                    <div className="flex items-center justify-between text-white font-medium mb-1">
                      <span>Administrator Role</span>
                      <span className="text-[10px] font-mono text-zinc-400">All Scopes</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Manage schemas, configure storage buckets, invite organization users, and inspect full audit logs.
                    </p>
                  </div>
                  <div className="rounded border border-zinc-800 bg-zinc-950 p-3">
                    <div className="flex items-center justify-between text-white font-medium mb-1">
                      <span>Document Manager</span>
                      <span className="text-[10px] font-mono text-zinc-400">Write / Read</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Create, upload, tag, and modify document records within permitted departmental categories.
                    </p>
                  </div>
                  <div className="rounded border border-zinc-800 bg-zinc-950 p-3">
                    <div className="flex items-center justify-between text-white font-medium mb-1">
                      <span>Read-Only Auditor</span>
                      <span className="text-[10px] font-mono text-zinc-400">Read-Only</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Query documents, inspect metadata values, and download authorized files without modification privileges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Deploy Section */}
        <section className="py-16 border-t border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to Access the System?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
              Sign in with your organization credentials or open the administrative document console.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                Open Document Console
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
