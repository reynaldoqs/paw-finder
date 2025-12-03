"use client";

import { AlertCircle, CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UploadResponse {
  success: boolean;
  path: string;
  url: string;
}

interface ErrorResponse {
  error: string;
}

export function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
      );
      setUploadStatus("error");
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage("File size exceeds 5MB limit.");
      setUploadStatus("error");
      return;
    }

    setSelectedFile(file);
    setUploadStatus("idle");
    setErrorMessage(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus("idle");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/pets/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse | ErrorResponse = await response.json();

      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || "Upload failed");
      }

      setUploadStatus("success");
      setUploadedUrl((data as UploadResponse).url);
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadStatus("idle");
    setUploadedUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const event = {
        target: { files: [file] },
      } as unknown as ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <Card className="p-6">
        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
              "hover:border-primary hover:bg-accent/50",
              "border-muted-foreground/25"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-muted-foreground">
              JPEG, PNG, WebP, or GIF (max 5MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-lg max-h-96 object-contain bg-muted"
              />
              {uploadStatus === "idle" && !uploading && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleReset}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate">
                  {selectedFile.name}
                </span>
                <span className="text-muted-foreground ml-2">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}

            {uploadStatus === "success" && uploadedUrl && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Upload successful!</p>
                  <p className="text-xs truncate">{uploadedUrl}</p>
                </div>
              </div>
            )}

            {uploadStatus === "error" && errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <div className="flex gap-2">
              {uploadStatus !== "success" && (
                <Button
                  onClick={handleUpload}
                  disabled={uploading || !selectedFile}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </>
                  )}
                </Button>
              )}
              {uploadStatus === "success" && (
                <Button onClick={handleReset} className="flex-1">
                  Upload Another
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
