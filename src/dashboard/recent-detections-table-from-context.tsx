import RecentDetectionsTable from "./recent-detection";
import { useLiveCamera } from "@/dashboard/live-camera-context";

export default function RecentDetectionsTableFromContext() {
  const { historyDetections } = useLiveCamera();
  return <RecentDetectionsTable detections={historyDetections} />;
}
