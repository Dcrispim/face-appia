import { cn, getMoodColor } from "@/lib/utils";
import { Camera } from "lucide-react";
import { useLiveCamera } from "./live-camera-context";

export default function LiveCamera() {
  const { currentDetections: detections } = useLiveCamera();

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Simulated webcam feed */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Camera Feed Active</p>
          <p className="text-sm opacity-75">1920x1080 @ 30fps</p>
        </div>
      </div>

      {/* Simulated face detection boxes */}
      {detections.map((detection) => {
        // x and y are now already in percentage

        return (
          <div
            key={detection.id}
            className={cn(
              "absolute w-32 h-40 border-2 rounded",
              getMoodColor(detection.mood).border,
            )}
            style={{ left: `${detection.x}%`, top: `${detection.y}%` }}
          >
            <div
              className={cn(
                "absolute -top-6 left-0 py-1 px-1 w-full text-black text-xs rounded",
                getMoodColor(detection.mood).bg,
              )}
            >
              {detection.name} ({(detection.confidence * 100).toFixed(0)}%)
            </div>
          </div>
        );
      })}

      {/* Status overlay */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
        {detections.length} faces detected • Processing at 28ms
      </div>
    </div>
  );
}
