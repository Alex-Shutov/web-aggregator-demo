import { useEffect, useState } from "react";

const useBlobUrl = (imageBlob:Blob) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const createImageUrl = () => {
      if (imageBlob) {
        const url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
      }
    };

    createImageUrl();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageBlob,imageUrl]);

  return imageUrl;
};

export default useBlobUrl;
