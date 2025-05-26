import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMoodColor = (mood: string) => {
  switch (mood.toLowerCase()) {
    case "happy":
      return { bg: "bg-green-500", border: "border-green-500" };
    case "neutral":
      return { bg: "bg-blue-500", border: "border-blue-500" };
    case "focused":
      return { bg: "bg-purple-500", border: "border-purple-500" };
    case "serious":
      return { bg: "bg-orange-500", border: "border-orange-500" };
    default:
      return { bg: "bg-gray-500", border: "border-gray-500" };
  }
};
