"use client";

import Timer from "@/components/timer";
import { LiveCameraProvider } from "@/dashboard/live-camera-context";
import LiveCameraCard from "@/dashboard/live-camera-card";
import LiveCameraAnalyticsCards from "./live-camera-analytics-cards";
import OperationStatus from "./operation-status";
import RecentDetectionsTable from "./recent-detection";
import TechnicalInformation from "./technical-information";

// Mock data for demonstration
const mockDetections: Detection[] = [
  {
    id: 1,
    name: "John Smith",
    age: 32,
    time: "14:23:15",
    confidence: 0.94,
    mood: "Happy",
    gender: "Male",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 28,
    time: "14:22:48",
    confidence: 0.89,
    mood: "Neutral",
    gender: "Female",
  },
  {
    id: 3,
    name: "Mike Chen",
    age: 35,
    time: "14:21:32",
    confidence: 0.92,
    mood: "Focused",
    gender: "Male",
  },
  {
    id: 4,
    name: "Emma Wilson",
    age: 24,
    time: "14:20:17",
    confidence: 0.87,
    mood: "Happy",
    gender: "Female",
  },
  {
    id: 5,
    name: "David Brown",
    age: 41,
    time: "14:19:03",
    confidence: 0.91,
    mood: "Serious",
    gender: "Male",
  },
];

export default function FacialRecognitionDashboard() {
  // Remove local state, use context instead
  return (
    <LiveCameraProvider>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Facial Recognition Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time monitoring and analytics
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* isLive from context */}
              {/* Timer remains as is */}
              <Timer />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Webcam Preview - Left Side */}
            <div className="lg:col-span-2">
              <LiveCameraCard />
            </div>

            {/* Analytics Cards - Right Side */}
            <div className="space-y-6 col-span-1">
              <LiveCameraAnalyticsCards />
            </div>
          </div>

          {/* Recent Detections Table */}
          <RecentDetectionsTable detections={mockDetections} />

          <TechnicalInformation />

          {/* System Status Footer */}
          <OperationStatus />
        </div>
      </div>
    </LiveCameraProvider>
  );
}
