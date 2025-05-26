import Timer from "@/components/timer";
import { LiveCameraProvider } from "@/context/live-camera-context";
import LiveCameraCard from "@/dashboard/live-camera-card";
import LiveCameraAnalyticsCards from "./live-camera-analytics-cards";
import OperationStatus from "./operation-status";
import RecentDetectionsTable from "./recent-detection";
import TechnicalInformation from "./technical-information";

export default function FacialRecognitionDashboard() {
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
				  <RecentDetectionsTable />

          <TechnicalInformation />

          {/* System Status Footer */}
          <OperationStatus />
        </div>
      </div>
    </LiveCameraProvider>
  );
}
