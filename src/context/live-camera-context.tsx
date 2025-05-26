import { RefObject, createContext, useContext, useRef, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface LiveCameraContextType {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
  currentDetections: DetectionMap;
  setCurrentDetections: Dispatch<SetStateAction<DetectionMap>>
  historyDetections: DetectionMap;
  setHistoryDetections: Dispatch<SetStateAction<DetectionMap>>
  totalPeople: number;
  setTotalPeople: (n: number) => void;
  facesPerHour: number;
  setFacesPerHour: (n: number) => void;
  isLive: boolean;
  setIsLive: (b: boolean) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
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
  const [currentDetections, setCurrentDetections] = useState<DetectionMap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [historyDetections, setHistoryDetections] = useState<DetectionMap>(
    {},
  );
  const [totalPeople, setTotalPeople] = useState(1247);
  const [facesPerHour, setFacesPerHour] = useState(156);
  const [isLive, setIsLive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <LiveCameraContext.Provider
      value={{
        loading,
        setLoading,
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
        videoRef,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
}
