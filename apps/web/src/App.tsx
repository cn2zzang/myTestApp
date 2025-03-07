import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./Calendar";

function App() {
  const [imageUri, setImageUri] = useState(null);

  const requestCameraAccess = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "REQUEST_CAMERA" })
    );
  };

  useEffect(() => {
    console.log("hihihi");
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      console.log(123, { event, data });

      if (data.type === "IMAGE") {
        console.log("image", data.imageUri);
        setImageUri(data.imageUri);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <Calendar />
      <button onClick={requestCameraAccess}>📸 사진 선택</button>
      {imageUri ? (
        <img
          src={imageUri}
          alt="Selected"
          style={{ width: "100%", maxHeight: 300, marginTop: 20 }}
        />
      ) : (
        <p>이미지를 선택해 주세요.</p>
      )}
    </>
  );
}

export default App;
