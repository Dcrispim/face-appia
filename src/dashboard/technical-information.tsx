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
    question: "Que regra utilizou para calcular a distância aproximada do rosto até a câmera?",
    answer:
      "A distância é estimada usando a fórmula: distância = (distância conhecida * distância entre olhos em pixels na calibração) / distância entre olhos detectada em pixels. Utilizei 30cm como distância conhecida e 230px como referência de distância entre olhos na calibração. Assim, a distância é inversamente proporcional à distância entre os olhos detectada na imagem. (Função: estimateDistance em src/dashboard/utils.tsx)\n\nObservação: Esta funcionalidade ainda não está completamente funcional pois o back-end não foi implementado.",
    snippets: [
      `export function estimateDistance(eyeDistance: number): number {\n  const distance_known = 30; // cm, calibration distance\n  const eye_pixel_known = 230; // px, eye pixel measurement at calibration\n  return (distance_known * eye_pixel_known) / eyeDistance;\n}`
    ],
  },
  {
    question: "Explique claramente qual o critério adotado para evitar contagens repetidas?",
    answer:
      "Para evitar contagens repetidas, a aplicação compara o descritor facial do rosto detectado com os descritores já registrados recentemente. Se a distância euclidiana entre descritores for maior que um limiar (0.6), considera-se um novo rosto; caso contrário, não é registrado novamente. Isso garante que o mesmo rosto não seja contado múltiplas vezes em sequência. (Função: findMatchingFace em src/dashboard/utils.tsx)\n\nObservação: Esta funcionalidade ainda não está completamente funcional pois o back-end não foi implementado.",
    snippets: [
      `const findMatchingFace = (\n  descriptor: Float32Array,\n  history: [string, Detection][]\n): string | null => {\n  let minDistance = 0.6; // tweak this threshold\n  let matchedName: string | null = null;\n  for (const [name, face] of history) {\n    const distance = faceapi.euclideanDistance(face.descriptor, descriptor);\n    if (distance < minDistance) {\n      minDistance = distance;\n      matchedName = name;\n    }\n  }\n  return matchedName;\n};`
    ],
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
                <p className="text-muted-foreground leading-relaxed">{qa.answer}</p>
                {qa.snippets && qa.snippets.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {qa.snippets.map((snippet, i) => (
                      <pre key={i} className="bg-muted text-xs rounded p-2 overflow-x-auto whitespace-pre-wrap border border-muted-foreground/10">
                        {snippet}
                      </pre>
                    ))}
                  </div>
                )}
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
