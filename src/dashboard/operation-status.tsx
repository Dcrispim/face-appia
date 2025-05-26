'use client'
import Timer from "@/components/timer";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveCamera } from "@/context/live-camera-context";
import { Zap } from "lucide-react";
import React from "react";

const OperationStatus: React.FC = () => {

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span>System Status: Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>GPU Utilization: 67%</span>
            </div>
          </div>
          <div
            className="text-muted-foreground"
            suppressHydrationWarning={true}
          >
            Last updated: <Timer />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationStatus;
