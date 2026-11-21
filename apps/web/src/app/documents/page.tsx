"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import FileUploader from "@/components/FileUploader";
import { FileText, Search, Download, ArrowLeft, RefreshCw, Folder } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDocuments = async (query = "") => {
    try {
      setLoading(true);
      const endpoint = query ? `/search?q=${encodeURIComponent(query)}` : "/documents";
      const res = await api.get(endpoint);
      setDocuments(res.data || res);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDocuments(searchQuery);
  };

  const handleDownload = async (docId: string) => {
    try {
      const res = await api.get(`/documents/${docId}/download`);
      if (res.data?.url) {
        window.open(res.data.url, "_blank");
      }
    } catch (err) {
      console.error("Failed to download", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col">
      {/* Console Top Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <FileText className="h-4 w-4" />
              <span>Document Explorer</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => fetchDocuments(searchQuery)}
              className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">Document Repository</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Browse, search, and upload files with attached schema metadata.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search documents by title or metadata attributes..."
                    className="w-full rounded-md border border-zinc-700 bg-zinc-950 pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  className="rounded-md bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 overflow-hidden">
              <table className="min-w-full divide-y divide-zinc-800 text-left text-xs">
                <thead className="bg-zinc-950/70 font-mono text-zinc-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">Document Title</th>
                    <th className="px-5 py-3 font-medium">Schema Type</th>
                    <th className="px-5 py-3 font-medium">Created Date</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-xs text-zinc-400 font-mono">
                        Querying document repository...
                      </td>
                    </tr>
                  ) : documents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-xs text-zinc-400">
                        No documents found in this organization partition.
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc: any) => (
                      <tr key={doc.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-white flex items-center gap-2">
                          <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                          <span>{doc.title}</span>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400">
                          {doc.documentType?.name || "Standard Document"}
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400 font-mono">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button 
                            onClick={() => handleDownload(doc.id)} 
                            className="inline-flex items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <FileUploader 
              documentTypeId="default"
              onUploadComplete={() => fetchDocuments(searchQuery)}
            />
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
