import * as faceapi from "face-api.js";
import { getMoodColor } from "../lib/utils";
export function estimateDistance(eyeDistance: number): number {
    const distance_known = 30; // cm, calibration distance
    const eye_pixel_known = 230; // px, eye pixel measurement at calibration


    return (distance_known * eye_pixel_known) / eyeDistance;
}

// Handles drawing on the canvas using face-api.js
export function handleCanvasDetection(ctx: CanvasRenderingContext2D, faceapi: typeof import('face-api.js'), detections: any[], dims: any, estimateDistance: (eyeDistance: number) => number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    faceapi.draw.drawDetections(ctx.canvas, faceapi.resizeResults(detections, dims));
    faceapi.draw.drawFaceLandmarks(ctx.canvas, faceapi.resizeResults(detections, dims));
    faceapi.draw.drawFaceExpressions(ctx.canvas, faceapi.resizeResults(detections, dims));
    detections.forEach(det => {
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
                Math.pow(leftEye.x - rightEye.x, 2) + Math.pow(leftEye.y - rightEye.y, 2)
            );
            const estDist = estimateDistance(eyeDistance);
            // Draw bounding box with mood color and thicker border
            const box = det.detection.box;
            const mood = det.expressions && typeof det.expressions === 'object' ? Object.entries(det.expressions).sort((a, b) => (b[1] as number) - (a[1] as number))[0][0] : "neutral";
            const { borderHex } = getMoodColor(mood);
            let borderColor = borderHex;
            const moodEmojis: Record<string, string> = {
                happy: "😄",
                sad: "😢",
                angry: "😠",
                surprised: "😲",
                fearful: "😨",
                disgusted: "🤢",
                neutral: "😐",
                Neutral: "😐",
            };
            ctx.save();
            ctx.lineWidth = 6;
            ctx.strokeStyle = borderColor;
            ctx.beginPath();
            ctx.rect(box.x, box.y, box.width, box.height);
            ctx.stroke();
            ctx.restore();
            ctx.save();
            ctx.font = '40px Arial';
            ctx.fillStyle = 'black';
            ctx.lineWidth = 3;
            const label = `${estDist.toFixed(1)} cm ${moodEmojis[mood] || ""}`;
            const textWidth = ctx.measureText(label).width;
            const textX = box.x + (box.width / 2) - (textWidth / 2);
            const textY = box.y - 8;
            const padding = 8;
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(
                textX - padding,
                textY - 40 + padding,
                textWidth + padding * 2,
                40
            );
            ctx.restore();
            ctx.save();
            ctx.font = '40px Arial';
            ctx.fillStyle = '#000';
            ctx.strokeStyle = '#0000';
            ctx.lineWidth = 3;
            ctx.strokeText(label, textX, textY);
            ctx.fillText(label, textX, textY);
            ctx.restore();
        }
    });
}

const findMatchingFace = (descriptor: Float32Array, history: [string, Detection][]): string | null => {

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
export function getDetectionsState({
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
            mood: det.expressions && typeof det.expressions === 'object' ? Object.entries(det.expressions).sort((a, b) => (b[1] as number) - (a[1] as number))[0][0] : "Neutral",
            gender: det.gender || "Unknown",
            descriptor: det.descriptor
        } as Detection;
        const matchedName = findMatchingFace(det.descriptor, historyDetectionsEntries);
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
        let leftEye = undefined, rightEye = undefined, eyeDistance = undefined;
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
                Math.pow(leftEye.x - rightEye.x, 2) + Math.pow(leftEye.y - rightEye.y, 2)
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
    const updatedHistory: DetectionMap = { ...Object.fromEntries(historyDetectionsEntries) };
    const baseSize = Object.keys(updatedHistory).length;
    newHistory.forEach((det) => {
        const id = baseSize + det.id;
        const name = `Person ${id}`;
        updatedHistory[name] = {
            ...det,
            id,
            name: `Person ${id}`
        };
    });
    return {
        newDetections: { ...newDetections },
        historyDetections: updatedHistory,
    };
}