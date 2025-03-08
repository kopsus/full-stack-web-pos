import React from "react";

const useImagePreview = () => {
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Cleanup URL saat komponen unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return { previewUrl, setPreviewUrl, handleImageChange };
};

export default useImagePreview;
