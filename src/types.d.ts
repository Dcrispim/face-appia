declare type Detection = {
  id: number;
  name: string;
  age: number;
  time: string;
  confidence: number;
  mood: string;
  gender: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  descriptor: Float32Array;
  distance?: number;
  leftEye?: { x: number; y: number };
  rightEye?: { x: number; y: number };
  eyeDistance?: number;
};

declare type DetectionMap = Record<string, Detection>;
