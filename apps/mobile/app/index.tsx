import { useRef } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";

import * as ImagePicker from "expo-image-picker";
import { useNotification } from "@/hooks/useNotification";

const requestPhotoPermissions = async () => {
  // 앨범(갤러리) 접근 권한 요청
  const { status: galleryStatus } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  // 카메라 접근 권한 요청
  const { status: cameraStatus } =
    await ImagePicker.requestCameraPermissionsAsync();

  console.log({ galleryStatus, cameraStatus });

  if (galleryStatus !== "granted" || cameraStatus !== "granted") {
    alert("카메라 및 갤러리 접근 권한이 필요합니다.");
  }
};

const takePhotoWithCamera = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log("takePhotoWithCamera", result);

  if (!result.canceled) {
    console.log("📸 촬영된 이미지:", result.assets[0].uri);
  }
};

export default function Page() {
  useNotification();
  const webViewRef = useRef<WebView>(null);

  const handleWebViewMessage = async (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === "REQUEST_CAMERA") {
      await requestPhotoPermissions();
      await pickImageFromGallery();
      // await takePhotoWithCamera();
      console.log(1111);
    }
  };

  const sendMessageToWeb = () => {
    const run = `
    document.documentElement.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");  
  `;

    webViewRef.current?.injectJavaScript(run);
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // 편집 기능 활성화
      aspect: [4, 3], // 비율 지정
      quality: 0.001, // 품질 (0 ~ 1)
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;

      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "IMAGE",
          imageUri,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: "https://my-test-app-blue.vercel.app/" }}
        style={{ flex: 1 }}
        onMessage={handleWebViewMessage}
        webviewDebuggingEnabled
        // allowFileAccess // 파일 접근 허용
        // allowUniversalAccessFromFileURLs // 다른 파일 접근 허용
        // originWhitelist={["*"]} // 모든 도메인 허용
      />
      {/* <Button title="Send to WebView" onPress={sendMessageToWeb} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
