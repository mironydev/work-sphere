"use client";

import { useState } from "react";
import { CloudArrowUpIn } from "@gravity-ui/icons";
import { toast } from "sonner";
import Image from "next/image";
import { uploadToImgBB } from "@/lib/actions/uploadImage";

export default function ImageUpload({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const url = await uploadToImgBB(file);
      onImageUpload(url);
    } catch (error) {
      toast.error("Failed to upload logo");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-1">
      {preview ? (
        <div className="flex items-center gap-3  rounded-lg">
          <label className="cursor-pointer shrink-0">
            <Image
              width={50}
              height={50}
              src={preview}
              alt="Preview"
              className="w-9 h-9 object-cover rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
          <div>
            <label>
              <span className="text-xs cursor-pointer">
                {uploading ? (
                  "Uploading..."
                ) : (
                  <div className="text-blue-500 underline">Change</div>
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <label className="cursor-pointer shrink-0">
            <CloudArrowUpIn className="w-9 h-9 bg-foreground/7 hover:bg-foreground/12 dark:bg-foreground/12 dark:hover:bg-foreground/16 p-2 rounded-lg" />
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
          <div>
            <p className="text-xs font-medium text-foreground/70">
              Click to upload logo
            </p>
            <p className="text-[10px] pt-0.5 text-muted">PNG, JPG, GIF</p>
          </div>
        </div>
      )}
    </div>
  );
}
