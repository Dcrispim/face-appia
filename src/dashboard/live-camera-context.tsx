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

export function useLiveCamera() {
  const ctx = useContext(LiveCameraContext);
  if (!ctx)
    throw new Error("useLiveCamera must be used within LiveCameraProvider");
  return ctx;
}

export function LiveCameraProvider({ children }: { children: ReactNode }) {
  const [currentDetections, setCurrentDetections] = useState<Detection[]>([]);
  const [historyDetections, setHistoryDetections] = useState<Detection[]>([]);
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
