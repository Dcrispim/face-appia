import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Brain } from "lucide-react";
import React from "react";

const technicalQA = [
  {
    question: "What facial recognition algorithm does this system use?",
    answer:
      "The system employs a deep learning-based approach using Convolutional Neural Networks (CNNs), specifically a modified ResNet architecture with attention mechanisms. It combines facial landmark detection with feature extraction to achieve 94.2% accuracy on diverse datasets.",
  },
  {
    question: "How does the system handle privacy and data protection?",
    answer:
      "All facial data is processed locally with end-to-end encryption. Biometric templates are stored as mathematical representations, not actual images. The system complies with GDPR, CCPA, and includes automatic data purging after 30 days unless explicitly retained for security purposes.",
  },
  {
    question:
      "What is the system's performance under different lighting conditions?",
    answer:
      "The system maintains 85%+ accuracy in low-light conditions using infrared enhancement and adaptive brightness algorithms. It includes anti-spoofing measures with liveness detection, 3D depth analysis, and can process up to 30 faces simultaneously at 60 FPS.",
  },
];
const TechnicalInformation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Technical Information
        </CardTitle>
        <CardDescription>Frequently asked technical questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {technicalQA.map((qa, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{qa.question}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {qa.answer}
                </p>
              </div>
            </div>
            {index < technicalQA.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TechnicalInformation;
