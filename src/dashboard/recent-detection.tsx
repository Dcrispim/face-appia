"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { getMoodColor } from "@/lib/utils";
import { useLiveCamera } from "../context/live-camera-context";
import { useEffect, useMemo, useState } from "react";

export default function RecentDetectionsTable() {
  const { historyDetections } = useLiveCamera();
  const [timer, setTimer] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const displayedDetections = useMemo(
    () => ({ ...historyDetections }),
    [timer],
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const historyDetectionsEntries = Object.entries(displayedDetections);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Recent Detections
        </CardTitle>
        <CardDescription>Latest facial recognition results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Age</th>
                <th className="text-left py-2 px-4">Time</th>
                <th className="text-left py-2 px-4">Confidence</th>
                <th className="text-left py-2 px-4">Mood</th>
                <th className="text-left py-2 px-4">Gender</th>
              </tr>
            </thead>
            <tbody>
              {historyDetectionsEntries.map(([name, detection]) => (
                <tr key={detection.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{name}</td>
                  <td className="py-3 px-4">{detection.age}</td>
                  <td className="py-3 px-4 font-mono text-sm">
                    {detection.time}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        detection.confidence > 0.9 ? "default" : "secondary"
                      }
                    >
                      {(detection.confidence * 100).toFixed(1)}%
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getMoodColor(detection.mood).bg}`}
                      />
                      {detection.mood}
                    </div>
                  </td>
                  <td className="py-3 px-4">{detection.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
