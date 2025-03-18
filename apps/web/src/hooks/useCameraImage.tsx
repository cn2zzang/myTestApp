import { useEffect, useState } from "react";

export default function useCameraImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "IMAGE") {
        console.log("image", data.imageUri);
        setImageUri(data.imageUri);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleRequestCamera = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "REQUEST_CAMERA" })
    );
  };

  const resetImageUri = () => {
    setImageUri(null);
  };

  return {
    imageUri,
    setImageUri,
    resetImageUri,
    handleRequestCamera,
  };
}
