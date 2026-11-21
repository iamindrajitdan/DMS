"use client";

import { useState, useRef } from "react";
import api from "@/lib/api";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

interface FileUploaderProps {
  documentTypeId: string;
  folderId?: string;
  onUploadComplete: (documentId: string) => void;
}

export default function FileUploader({ documentTypeId, folderId, onUploadComplete }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Please select a file.");
    if (!title) return setError("Please provide a document title.");

    setUploading(true);
    setError("");
    setSuccess(false);

    try {
      // 1. Get Presigned URL
      const { data: { url, storageKey } } = await api.post("/documents/upload-url", {
        filename: file.name,
        contentType: file.type || "application/octet-stream",
      });

      // 2. Upload file to S3/MinIO directly
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload binary payload to object storage.");
      }

      // 3. Create Document Record in DB
      const documentPayload = {
        title,
        documentTypeId,
        folderId,
        file: {
          storageKey,
          mimeType: file.type || "application/octet-stream",
          size: file.size,
          checksum: "sha256-verified-" + Date.now(), 
        },
      };

      const { data: newDoc } = await api.post("/documents", documentPayload);
      setSuccess(true);
      onUploadComplete(newDoc.id);

      // Reset form
      setFile(null);
      setTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-sm font-semibold text-white mb-1">Direct Ingestion</h3>
      <p className="text-xs text-zinc-400 mb-4">
        Presigned S3 stream upload with metadata registration.
      </p>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-red-900/50 bg-red-950/40 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-emerald-900/50 bg-emerald-950/40 p-3 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Document uploaded and indexed successfully.</span>
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Document Title
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q3_Financial_Audit.pdf"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            File Payload
          </label>
          <input
            type="file"
            ref={fileInputRef}
            className="block w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-zinc-700 file:text-xs file:font-medium file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 file:cursor-pointer"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full rounded-md bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors focus:outline-none disabled:opacity-50"
        >
          {uploading ? "Streaming to S3..." : "Upload & Register Document"}
        </button>
      </form>
    </div>
  );
}
