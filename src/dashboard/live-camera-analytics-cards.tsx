import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Users } from "lucide-react";
import { useLiveCamera } from "@/dashboard/live-camera-context";

export default function LiveCameraAnalyticsCards() {
  const { totalPeople, facesPerHour } = useLiveCamera();
  return (
    <>
      {/* Total People */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total People</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPeople}</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      {/* Faces per Hour */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faces/Hour</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{facesPerHour}</div>
          <p className="text-xs text-muted-foreground">Current hour average</p>
          <Progress value={65} className="mt-2" />
        </CardContent>
      </Card>

      {/* Most Common Mood */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dominant Mood</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Happy</div>
          <p className="text-xs text-muted-foreground">42% of detections</p>
          <div className="flex gap-1 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gender Split</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Male</span>
              <span className="text-sm font-medium">58%</span>
            </div>
            <Progress value={58} className="h-2" />
            <div className="flex justify-between">
              <span className="text-sm">Female</span>
              <span className="text-sm font-medium">42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
