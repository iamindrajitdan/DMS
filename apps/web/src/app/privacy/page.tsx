import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Enterprise privacy policy, data processing standards, and security protocols for NextGen DMS.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
            <Link href="/" className="hover:text-zinc-200 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-200">Privacy Policy</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Effective Date: January 1, 2026. Last Updated: November 20, 2026.
          </p>
        </div>

        <div className="mt-10 space-y-12 text-sm leading-relaxed text-zinc-300">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">1. System Scope and Architecture</h2>
            <p>
              NextGen DMS is an enterprise-grade document management platform engineered for self-hosted and private cloud deployments. 
              This Privacy Policy explains how information is collected, processed, isolated, and protected across our platform instances, 
              application programming interfaces (APIs), and web client interfaces.
            </p>
            <p>
              When deployed within your enterprise infrastructure or private VPC, your organization operates as the primary Data Controller 
              for all uploaded documents, internal user accounts, and organizational metadata. NextGen DMS processes data strictly pursuant to 
              your administrative configuration and system operational rules.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">2. Information Collected and Processed</h2>
            <p>NextGen DMS processes the following categories of information solely to provide document storage and search functionality:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="font-medium text-white mb-1">Account & Identity Information</h3>
                <p className="text-xs text-zinc-400">
                  Full name, corporate email address, hashed credentials (using Argon2/bcrypt), assigned organizational roles, and permission levels.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="font-medium text-white mb-1">Document Payloads & Binary Files</h3>
                <p className="text-xs text-zinc-400">
                  Binary files uploaded by authorized users, stored directly in your designated S3-compatible object storage repository.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="font-medium text-white mb-1">Structured Document Metadata</h3>
                <p className="text-xs text-zinc-400">
                  Schema attributes, title, tags, classification tags, MIME types, file sizes, creation timestamps, and SHA-256 integrity checksums.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="font-medium text-white mb-1">Audit Trails & Access Records</h3>
                <p className="text-xs text-zinc-400">
                  Immutable event timestamps, user identifier, action performed (upload, download, view, metadata update), and origin IP addresses.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">3. Storage Architecture and Data Isolation</h2>
            <p>
              NextGen DMS isolates tenant data at the database level and the object storage container level:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">PostgreSQL Metadata Store:</strong> All user records, document schemas, and indexing tables enforce tenant separation via organization identifier checks on every database transaction.
              </li>
              <li>
                <strong className="text-zinc-200">Direct Presigned S3 Transfers:</strong> Files are transferred directly between the client browser and the designated object storage repository (such as AWS S3 or MinIO) using short-lived presigned URLs.
              </li>
              <li>
                <strong className="text-zinc-200">Redis Ephemeral Caching:</strong> Fast cache lookups and user session verification expire automatically pursuant to your configured time-to-live policies.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">4. Security Standards and Cryptographic Safeguards</h2>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards to prevent unauthorized access or disclosure:
            </p>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-3 rounded-md border border-zinc-800 bg-zinc-900/30 p-3">
                <Lock className="h-4 w-4 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-200">In-Transit Encryption:</span> All communications between users, the API, and storage backends are strictly mandated to use TLS 1.3 encryption.
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-zinc-800 bg-zinc-900/30 p-3">
                <Shield className="h-4 w-4 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-200">At-Rest Protection:</span> Object storage buckets and PostgreSQL volumes should be configured with AES-256 hardware or software-level disk encryption.
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-zinc-800 bg-zinc-900/30 p-3">
                <FileText className="h-4 w-4 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-200">Payload Integrity:</span> Every document upload records a SHA-256 checksum to guarantee verification against bit rot or tampering.
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">5. Zero Third-Party Advertising or Selling of Data</h2>
            <p>
              NextGen DMS does not contain third-party advertising scripts, behavioural trackers, or data-broker integrations. 
              We do not sell, rent, monetize, or harvest customer documents or operational metadata. Your data remains strictly within 
              your defined boundaries.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">6. Data Retention and Hard Deletion</h2>
            <p>
              Document retention policies are configured by your designated organization administrators. When a document is permanently 
              deleted via the administrative API or user interface:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>The object reference is removed from PostgreSQL metadata index tables.</li>
              <li>A direct deletion command is issued to the S3 storage bucket target.</li>
              <li>An audit log record is preserved denoting the deletion event and issuing user identifier for compliance auditing.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">7. User Rights and Administrative Access</h2>
            <p>
              Under applicable regulations, including GDPR and CCPA, authorized users maintain rights regarding their personal data, 
              including the right to inspect account records, request rectification, export document collections, and request account deactivation. 
              In self-hosted configurations, these requests are directly serviced by your organization system administrator.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">8. Contact and Compliance Point of Contact</h2>
            <p>
              For security notifications, vulnerability reports, or compliance inquiries related to NextGen DMS software, 
              please contact your internal systems administrator or reach out to our engineering team at:
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs font-mono text-zinc-300">
              NextGen DMS Security & Compliance Team<br />
              Email: security@nextgendms.internal<br />
              PGP Key Fingerprint: 4B8A 920E 117F 63CD E821 0041 A810 B982
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
