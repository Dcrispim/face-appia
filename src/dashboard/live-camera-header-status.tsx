"use client";
import { useLiveCamera } from "@/context/live-camera-context";
import Timer from "@/components/timer";

export default function LiveCameraHeaderStatus() {
  const { isLive } = useLiveCamera();
  return (
    <>
      <div
        className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
      />
      <span className="text-sm font-medium">{isLive ? "LIVE" : "OFFLINE"}</span>
      <Timer />
    </>
  );
}
