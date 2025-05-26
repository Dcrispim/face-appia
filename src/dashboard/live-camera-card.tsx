import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera } from "lucide-react";
import LiveCamera from "./live-camera";

export default function LiveCameraCard() {
  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Live Camera Feed
        </CardTitle>
        <CardDescription>Main entrance monitoring</CardDescription>
      </CardHeader>
      <CardContent className="h-[520px]">
        <LiveCamera />
      </CardContent>
    </Card>
  );
}
