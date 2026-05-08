"use client";

import { useState } from "react";
import TextInputSection from "./TextInputSection";
import TextInfoSection from "./TextInfoSection";
import SimpleAnalysisSection from "@/components/analysis/SimpleAnalysisSection";
import AppButton from "@/components/ui/AppButton";
import AnalysisErrorFrame from "@/components/analysis/AnalysisErrorFrame";

export type TextStatus = "idle" | "loading" | "result" | "analysisError";

export type TextResult = {
  toxicity: number;
  offense: boolean;
  comment: string;
};

export default function TextMainSection() {
  const [status, setStatus] = useState<TextStatus>("idle");
  const [result, setResult] = useState<TextResult | null>(null);

  return (
    <section className="bg-white-custom flex justify-center">
      <div className="w-[1440px] h-fit gap-[20px] pb-[20px] flex flex-col">
        
        <TextInputSection
          status={status}
          setStatus={setStatus}
          setResult={setResult}
        />

        {status === "loading" && (
          <SimpleAnalysisSection
            variant="loading"
            items={[
              {
                icon: "/analysis cards icons/card toxicity.png",
                title: "Токсичность",
              },
              {
                icon: "/analysis cards icons/card offense.png",
                title: "Оскорбление",
              },
            ]}
          />
        )}

        {status === "result" && result && (
            <>
            <SimpleAnalysisSection
                variant="result"
                items={[
                {
                    icon: "/analysis cards icons/card toxicity.png",
                    title: "Токсичность",
                    value: `${result.toxicity} %`,
                    danger: result.toxicity > 50,
                },
                {
                    icon: "/analysis cards icons/card offense.png",
                    title: "Оскорбление",
                    value: result.offense ? "обнаружено" : "(не) обнаружено",
                    danger: result.offense,
                },
                ]}
                comment={result.comment}
            />

            <div  className="h-fit gap-[10px] px-[10px] py-[10px] bg-white-custom flex justify-center">
                <AppButton variant="checkAnother">
                    Проверить другой текст
                </AppButton>
            </div>

            </>
          
        )}


        {status === "analysisError" && (
            <>
                <SimpleAnalysisSection
                    variant="error"
                    items={[
                    {
                        icon: "/analysis cards icons/card toxicity.png",
                        title: "Токсичность",
                    },
                    {
                        icon: "/analysis cards icons/card offense.png",
                        title: "Оскорбление",
                    },
                    ]}
                />

                <AnalysisErrorFrame
                    message={
                        <>
                            Не удалось проанализировать текст.
                            <br />
                            Попробуйте загрузить другой или повторить операцию через некоторое время.
                        </>
                    }
                />
        
                <div className="h-fit gap-[10px] px-[10px] py-[10px] bg-white-custom flex justify-center">
                    <AppButton
                    variant="checkAnother"
                    onClick={() => {
                        setStatus("idle");
                        setResult(null);
                    }}
                    >
                    Проверить другой текст
                    </AppButton>
                </div>
            </>
        )}

        {status === "idle" && <TextInfoSection />}
      </div>
    </section>
  );
}