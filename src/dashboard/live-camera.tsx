"use client";
import { cn, getMoodColor } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useLiveCamera } from "../context/live-camera-context";
import * as faceapi from "face-api.js";
import VideoFeed from "./video-feed";
import { LoaderIcon } from "lucide-react";
import { handleCanvasDetection } from "./utils";

function estimateDistance(eyeDistance: number): number {
  const distance_known = 30; // cm, calibration distance
  const eye_pixel_known = 230; // px, eye pixel measurement at calibration

  return (distance_known * eye_pixel_known) / eyeDistance;
}

// Handles drawing on the canvas using face-api.js
function handleCanvasDetections(
  ctx: CanvasRenderingContext2D,
  faceapi: typeof import("face-api.js"),
  detections: any[],
  dims: any,
  estimateDistance: (eyeDistance: number) => number,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  faceapi.draw.drawDetections(
    ctx.canvas,
    faceapi.resizeResults(detections, dims),
  );
  faceapi.draw.drawFaceLandmarks(
    ctx.canvas,
    faceapi.resizeResults(detections, dims),
  );
  faceapi.draw.drawFaceExpressions(
    ctx.canvas,
    faceapi.resizeResults(detections, dims),
  );
  detections.forEach((det) => {
    if (det.landmarks) {
      const landmarks = det.landmarks.positions;
      const leftEye = {
        x: (landmarks[36].x + landmarks[39].x) / 2,
        y: (landmarks[36].y + landmarks[39].y) / 2,
      };
      const rightEye = {
        x: (landmarks[42].x + landmarks[45].x) / 2,
        y: (landmarks[42].y + landmarks[45].y) / 2,
      };
      const eyeDistance = Math.sqrt(
        Math.pow(leftEye.x - rightEye.x, 2) +
          Math.pow(leftEye.y - rightEye.y, 2),
      );
      const estDist = estimateDistance(eyeDistance);
      ctx.save();
      ctx.font = "16px Arial";
      ctx.fillStyle = "yellow";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      const box = det.detection.box;
      const label = `${estDist.toFixed(1)} cm`;
      const textWidth = ctx.measureText(label).width;
      ctx.strokeText(label, box.x + box.width / 2 - textWidth / 2, box.y - 8);
      ctx.fillText(label, box.x + box.width / 2 - textWidth / 2, box.y - 8);
      ctx.restore();
    }
  });
}

const findMatchingFace = (
  descriptor: Float32Array,
  history: [string, Detection][],
): string | null => {
  let minDistance = 0.6; // tweak this threshold
  let matchedName: string | null = null;

  for (const [name, face] of history) {
    const distance = faceapi.euclideanDistance(face.descriptor, descriptor);
    if (distance < minDistance) {
      minDistance = distance;
      matchedName = name;
    }
  }

  return matchedName;
};

// Handles saving detection data to context and returns the new state
function getDetectionsState({
  detections,
  historyDetectionsEntries,
}: {
  detections: any[];
  historyDetectionsEntries: [string, Detection][];
}) {
  const newDetections: DetectionMap = {};
  const newHistory: Detection[] = [];
  detections.forEach((det, idx) => {
    const _detection: Detection = {
      age: det.age ? Math.round(det.age) : 0,
      time: new Date().toLocaleTimeString(),
      confidence: det.detection.score,
      mood:
        det.expressions && typeof det.expressions === "object"
          ? Object.entries(det.expressions).sort(
              (a, b) => (b[1] as number) - (a[1] as number),
            )[0][0]
          : "Neutral",
      gender: det.gender || "Unknown",
      descriptor: det.descriptor,
    } as Detection;
    const matchedName = findMatchingFace(
      det.descriptor,
      historyDetectionsEntries,
    );
    if (!matchedName) {
      _detection.id = idx;
      _detection.name = `Person ${idx}`;
      _detection.id = idx;
      newHistory.push(_detection);
    }
    const box = det.alignedRect.box;
    const width = box.width;
    const height = box.height;
    // Eye landmarks
    let leftEye = undefined,
      rightEye = undefined,
      eyeDistance = undefined;
    if (det.landmarks) {
      const landmarks = det.landmarks.positions;
      leftEye = {
        x: (landmarks[36].x + landmarks[39].x) / 2,
        y: (landmarks[36].y + landmarks[39].y) / 2,
      };
      rightEye = {
        x: (landmarks[42].x + landmarks[45].x) / 2,
        y: (landmarks[42].y + landmarks[45].y) / 2,
      };
      eyeDistance = Math.sqrt(
        Math.pow(leftEye.x - rightEye.x, 2) +
          Math.pow(leftEye.y - rightEye.y, 2),
      );
    }
    newDetections[_detection.name] = {
      ..._detection,
      x: box.x,
      y: box.y,
      w: width,
      h: height,
      leftEye,
      rightEye,
      eyeDistance,
    };
  });
  // Build updated history
  const updatedHistory: DetectionMap = {
    ...Object.fromEntries(historyDetectionsEntries),
  };
  const baseSize = Object.keys(updatedHistory).length;
  newHistory.forEach((det) => {
    const id = baseSize + det.id;
    const name = `Person ${id}`;
    updatedHistory[name] = {
      ...det,
      id,
      name: `Person ${id}`,
    };
  });
  return {
    currentDetections: { ...newDetections },
    historyDetections: updatedHistory,
  };
}

export default function LiveCamera() {
  const {
    currentDetections,
    setCurrentDetections,
    historyDetections,
    setHistoryDetections,
    videoRef,
    loading,
    setLoading,
  } = useLiveCamera();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentDetectionsEntries = Object.entries(currentDetections);
  const historyDetectionsEntries = Object.entries(historyDetections);
  useEffect(() => {
    const localVideoRef = videoRef.current;
    const localCanvasRef = canvasRef.current;
    let isMounted = true;
    let detectionInterval: NodeJS.Timeout | null = null;

    // Load face-api.js models
    const loadModels = async () => {
      setLoading(true);

      const MODEL_URL = "/weights";
      await Promise.all([
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
    };

    // Run face detection on the video
    const startDetection = () => {
      if (!localVideoRef || !localCanvasRef) return;
      detectionInterval = setInterval(async () => {
        if (!localVideoRef || localVideoRef.readyState !== 4) return;
        const detections = await faceapi
          .detectAllFaces(localVideoRef, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks(true)
          .withFaceDescriptors()
          .withFaceExpressions()
          .withAgeAndGender();

        if (!isMounted) return;
        const dims = faceapi.matchDimensions(
          localCanvasRef,
          localVideoRef,
          true,
        );
        const ctx = localCanvasRef.getContext("2d");
        if (ctx) {
          handleCanvasDetection(
            ctx,
            faceapi,
            detections,
            dims,
            estimateDistance,
          );
        }

        // Use the new getDetectionsState function
        const { currentDetections: newCurrent, historyDetections: newHistory } =
          getDetectionsState({
            detections,
            historyDetectionsEntries,
          });
        setCurrentDetections(newCurrent);
        setHistoryDetections((prev) => {
          const merged = { ...prev, ...newHistory };
          const entries = Object.entries(merged);
          const lastFive = entries.slice(-5);
          return Object.fromEntries(lastFive);
        });
      }, 300);
    };

    loadModels().then(() => {
      setLoading(false);

      // Only start detection after video is playing
      if (localVideoRef) {
        localVideoRef.onloadeddata = () => {
          startDetection();
        };
      }
    });

    return () => {
      isMounted = false;
      if (localVideoRef && localVideoRef.srcObject) {
        const tracks = (localVideoRef.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (detectionInterval) clearInterval(detectionInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentDetections, videoRef]);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      <VideoFeed />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="absolute flex bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
        {currentDetectionsEntries.length} faces detected •{" "}
        {loading ? (
          <LoaderIcon className="px-1 animate-spin" />
        ) : (
          `Processing at ${300}ms `
        )}
      </div>
    </div>
  );
}
