import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Scale, FileCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions",
  description: "Enterprise Terms of Service, licensing conditions, and operational commitments for NextGen DMS.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
            <Link href="/" className="hover:text-zinc-200 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-200">Terms & Conditions</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Effective Date: January 1, 2026. Standard Enterprise Version 1.0.
          </p>
        </div>

        <div className="mt-10 space-y-12 text-sm leading-relaxed text-zinc-300">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">1. Acceptance of Terms</h2>
            <p>
              These Terms and Conditions govern the deployment, access, and use of NextGen DMS software, its accompanying user 
              interfaces, and backend services. By deploying, installing, accessing, or configuring this software, your organization 
              agrees to be bound by these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">2. Software Deployment and License Grant</h2>
            <p>
              Subject to your compliance with these Terms, NextGen DMS grants your organization a non-exclusive, non-transferable, 
              revocable license to install, operate, and utilize the software within your organization technical infrastructure.
            </p>
            <p>
              Your organization maintains sole discretion over infrastructure topology, network boundaries, database provisioning, 
              and backup scheduling.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">3. Customer Data Ownership and Exclusivity</h2>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Customer Data Ownership Guarantee</span>
              </div>
              <p className="text-xs text-zinc-400">
                You retain all right, title, and interest, including all worldwide intellectual property rights, in and to all document files, 
                metadata definitions, taxonomy tags, schemas, and user logs processed by NextGen DMS. NextGen DMS claims zero proprietary 
                rights or licenses over your content.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">4. Acceptable Use and Responsibilities</h2>
            <p>
              When utilizing NextGen DMS, authorized users and administrators agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Upload files containing malicious code, automated exploits, ransomware, or logic bombs.</li>
              <li>Circumvent or tamper with role-based access control (RBAC) boundaries or cryptographic tokens.</li>
              <li>Expose private S3 bucket credentials or database connection strings to unauthenticated public endpoints.</li>
              <li>Conduct unauthorized denial of service attacks or penetrative load tests without prior administrative coordination.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">5. User Authentication and Account Security</h2>
            <p>
              Administrators and users are responsible for maintaining the confidentiality of access credentials, API keys, and session tokens. 
              Any action originating from an authenticated session is attributed to that credential owner. Organizations must immediately invalidate 
              tokens and rotate passwords upon suspected compromise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">6. Storage, Backups, and High Availability</h2>
            <p>
              For self-hosted instances, your organization is responsible for provisioning redundant storage, executing regular database snapshots, 
              and maintaining offsite S3 object replication. NextGen DMS provides software interfaces for integration with external high-availability 
              clusters (PostgreSQL streaming replication, MinIO distributed clusters, and Redis Sentinel).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">7. Warranty Disclaimers</h2>
            <p>
              To the maximum extent permitted by applicable law, NextGen DMS is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, 
              without warranties of any kind, whether express, implied, statutory, or otherwise, including implied warranties of merchantability, 
              fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">8. Limitation of Liability</h2>
            <p>
              In no event shall NextGen DMS, its developers, or contributors be held liable for any indirect, incidental, special, consequential, 
              or punitive damages, including loss of data, loss of profits, system downtime, or corruption of files resulting from the use or inability 
              to use the platform, regardless of legal theory.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">9. Termination</h2>
            <p>
              Your organization may terminate this agreement at any time by ceasing all use of the software and decommissioning its associated 
              container images and database tables. Upon termination, you retain full access to your underlying S3 objects and PostgreSQL database dumps.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">10. Contact Information</h2>
            <p>
              Inquiries regarding enterprise licensing agreements, custom terms, or compliance documentation may be directed to:
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs font-mono text-zinc-300">
              NextGen DMS Legal Department<br />
              Email: legal@nextgendms.internal<br />
              Ref: Enterprise Terms of Service Agreement v1.0
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
