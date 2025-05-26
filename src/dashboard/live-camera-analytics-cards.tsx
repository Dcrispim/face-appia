'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Users } from "lucide-react";
import { useLiveCamera } from "@/context/live-camera-context";

export default function LiveCameraAnalyticsCards() {
    const { currentDetections: currentDetectionsMap } = useLiveCamera();
    const currentDetections = Object.entries(currentDetectionsMap)
    // Calculate analytics from currentDetections
    const totalPeople = currentDetections.length;
    const facesPerHour = currentDetections.length; // Placeholder: you may want to use a real calculation

    // Mood analytics
    const moodCount: Record<string, number> = {};
    let dominantMood = "-";
    let dominantMoodPercent = 0;
    currentDetections.forEach(([_, d]) => {
        moodCount[d.mood] = (moodCount[d.mood] || 0) + 1;
    });
    if (totalPeople > 0) {
        const sorted = Object.entries(moodCount).sort((a, b) => b[1] - a[1]);
        dominantMood = sorted[0][0];
        dominantMoodPercent = Math.round((sorted[0][1] / totalPeople) * 100);
    }

    // Gender analytics
    const maleCount = currentDetections.filter(([_, d]) => d.gender === "male" || d.gender === "Male").length;
    const femaleCount = currentDetections.filter(([_, d]) => d.gender === "female" || d.gender === "Female").length;
    const genderTotal = maleCount + femaleCount;
    const malePercent = genderTotal > 0 ? Math.round((maleCount / genderTotal) * 100) : 0;
    const femalePercent = genderTotal > 0 ? Math.round((femaleCount / genderTotal) * 100) : 0;

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
                    <p className="text-xs text-muted-foreground">Current session</p>
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
                    <Progress value={facesPerHour > 100 ? 100 : facesPerHour} className="mt-2" />
                </CardContent>
            </Card>

            {/* Most Common Mood */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Dominant Mood</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{dominantMood}</div>
                    <p className="text-xs text-muted-foreground">{dominantMoodPercent}% of detections</p>
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
                            <span className="text-sm font-medium">{malePercent}%</span>
                        </div>
                        <Progress value={malePercent} className="h-2" />
                        <div className="flex justify-between">
                            <span className="text-sm">Female</span>
                            <span className="text-sm font-medium">{femalePercent}%</span>
                        </div>
                        <Progress value={femalePercent} className="h-2" />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
