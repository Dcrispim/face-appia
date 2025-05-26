import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMoodColor = (mood: string) => {
  switch (mood.toLowerCase()) {
    case "happy":
      return {
        bg: "bg-green-500",
        border: "border-green-500",
        bgHex: "#22c55e",
        borderHex: "#22c55e",
      };
    case "neutral":
      return {
        bg: "bg-blue-500",
        border: "border-blue-500",
        bgHex: "#3b82f6",
        borderHex: "#3b82f6",
      };
    case "focused":
      return {
        bg: "bg-purple-500",
        border: "border-purple-500",
        bgHex: "#a21caf",
        borderHex: "#a21caf",
      };
    case "serious":
      return {
        bg: "bg-orange-500",
        border: "border-orange-500",
        bgHex: "#f97316",
        borderHex: "#f97316",
      };
    default:
      return {
        bg: "bg-gray-500",
        border: "border-gray-500",
        bgHex: "#6b7280",
        borderHex: "#6b7280",
      };
  }
};
