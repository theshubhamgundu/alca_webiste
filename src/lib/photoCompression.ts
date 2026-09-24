/** Resize a local photo before it is kept in browser localStorage. */
export function compressPhoto(
  file: File,
  maxDimension = 1100,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(
        1,
        maxDimension / Math.max(image.naturalWidth, image.naturalHeight),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) return reject(new Error("Could not prepare image canvas"));
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const finish = (blob: Blob | null) => {
        if (!blob) return reject(new Error("Could not compress image"));
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () =>
          reject(new Error("Could not read compressed image"));
        reader.readAsDataURL(blob);
      };
      canvas.toBlob(
        (blob) => {
          // Older browsers may silently return PNG for an unsupported WebP request.
          if (blob?.type === "image/webp") finish(blob);
          else canvas.toBlob(finish, "image/jpeg", 0.86);
        },
        "image/webp",
        0.84,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    image.src = url;
  });
}
