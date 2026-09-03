import { useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const MAX_BYTES = 15 * 1024 * 1024;

function extensionOf(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (/^(jpg|jpeg|png|webp|avif|gif)$/.test(fromName)) return fromName === "jpeg" ? "jpg" : fromName;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

/**
 * Uploads a picture to the private `site-images` bucket and hands back the
 * public URL served by /api/public/img/<key>.
 */
export function ImageUploadField({
  value,
  onChange,
  label = "Upload a new picture",
}: {
  value: string | null | undefined;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Image is larger than 15 MB");
      return;
    }
    setBusy(true);
    try {
      const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extensionOf(file)}`;
      const { error } = await supabase.storage.from("site-images").upload(key, file, {
        contentType: file.type || "image/jpeg",
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      onChange(`/api/public/img/${key}`);
      toast.success("Picture uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className="w-28 aspect-[4/3] rounded-sm overflow-hidden border border-border bg-muted shrink-0">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-[10px] text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 rounded-sm border border-primary text-primary text-xs uppercase tracking-widest disabled:opacity-60"
        >
          {busy ? "Uploading…" : label}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-3 text-xs underline text-muted-foreground"
          >
            Remove
          </button>
        )}
        <p className="text-[11px] text-muted-foreground mt-2">JPG, PNG or WebP · up to 15 MB.</p>
      </div>
    </div>
  );
}
