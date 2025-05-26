import { createContext, useContext, useState, ReactNode } from "react";

export type Detection = {
  id: number;
  name: string;
  age: number;
  time: string;
  confidence: number;
  mood: string;
  gender: string;
  x?: number;
  y?: number;
};

interface LiveCameraContextType {
  currentDetections: Detection[];
  setCurrentDetections: (d: Detection[]) => void;
  historyDetections: Detection[];
  setHistoryDetections: (d: Detection[]) => void;
  totalPeople: number;
  setTotalPeople: (n: number) => void;
  facesPerHour: number;
  setFacesPerHour: (n: number) => void;
  isLive: boolean;
  setIsLive: (b: boolean) => void;
}

const LiveCameraContext = createContext<LiveCameraContextType | undefined>(
  undefined,
);

const mockCurrentDetections: Detection[] = [
  {
    id: 1,
    name: "John Smith",
    age: 32,
    time: "14:23:15",
    confidence: 0.94,
    mood: "Happy",
    gender: "Male",
    y: 16,
    x: 16,
  }, // 16% left, 16% top
  {
    id: 2,
    name: "Sarah Johnson",
    age: 28,
    time: "14:22:48",
    confidence: 0.89,
    mood: "Neutral",
    gender: "Female",
    y: 26,
    x: 75,
  }, // 26% top, 75% left
];

// Mock data for demonstration
const mockHistoryDetections: Detection[] = [
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

export function useLiveCamera() {
  const ctx = useContext(LiveCameraContext);
  if (!ctx)
    throw new Error("useLiveCamera must be used within LiveCameraProvider");
  return ctx;
}

export function LiveCameraProvider({ children }: { children: ReactNode }) {
  const [currentDetections, setCurrentDetections] = useState<Detection[]>(
    mockCurrentDetections,
  );
  const [historyDetections, setHistoryDetections] = useState<Detection[]>(
    mockHistoryDetections,
  );
  const [totalPeople, setTotalPeople] = useState(1247);
  const [facesPerHour, setFacesPerHour] = useState(156);
  const [isLive, setIsLive] = useState(true);

  return (
    <LiveCameraContext.Provider
      value={{
        currentDetections,
        setCurrentDetections,
        totalPeople,
        setTotalPeople,
        facesPerHour,
        setFacesPerHour,
        isLive,
        setIsLive,
        historyDetections,
        setHistoryDetections,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
}
