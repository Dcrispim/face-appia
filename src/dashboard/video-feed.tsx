import { useEffect } from "react";
import { useLiveCamera } from "../context/live-camera-context";

export default function VideoFeed() {
  const { videoRef } = useLiveCamera();

  useEffect(() => {
    const localVideoRef = videoRef.current;
    let stream: MediaStream | null = null;
    const getWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (localVideoRef) {
          localVideoRef.srcObject = stream;
        }
      } catch (err) {
        console.error("Webcam error", err);
      }
    };
    getWebcam();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ background: "#222" }}
    />
  );
}
