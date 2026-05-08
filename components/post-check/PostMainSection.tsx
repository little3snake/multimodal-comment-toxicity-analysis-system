"use client";

import { useState } from "react";

import AppButton from "@/components/ui/AppButton";

import PostInputSection from "./PostInputSection";
import PostInfoSection from "./PostInfoSection";

import PostAnalysisSection from "./PostAnalysisSection";
import PostCommentsSection from "./PostCommentsSection";

export type PostStatus =
  | "idle"
  | "filled"
  | "error"
  | "loading"
  | "result"
  | "analysisError";

export type PostResult = {
  totalComments: number;
  offenseCount: number;
  toxicCount: number;
  toxicPercent: number;
};

export default function PostMainSection() {
  const [status, setStatus] = useState<PostStatus>("idle");

  const [result, setResult] = useState<PostResult | null>(null);

  return (
    <section className="bg-white-custom flex justify-center">
      <div className="w-[1440px] h-fit flex flex-col gap-[30px] pb-[30px]">
        
        <PostInputSection
          status={status}
          setStatus={setStatus}
          setResult={setResult}
        />

        {status === "loading" && (
          <>
            <PostAnalysisSection variant="loading" />

            <PostCommentsSection variant="loading" />
          </>
        )}

        {status === "result" && result && (
            <>
                <PostAnalysisSection
                variant="result"
                items={[
                    {
                    icon: "/analysis cards icons/comments.png",
                    title: "Всего комментариев",
                    value: `${result.totalComments}`,
                    danger: false,
                    },
                    {
                    icon: "/analysis cards icons/card offense.png",
                    title: "Оскорбление",
                    value: `${result.offenseCount}`,
                    danger: result.offenseCount > 0,
                    },
                    {
                    icon: "/analysis cards icons/card toxicity.png",
                    title: "Токсичных",
                    value: `${result.toxicCount}`,
                    danger: result.toxicCount > 0,
                    },
                    {
                    icon: "/analysis cards icons/toxic percent.png",
                    title: "Доля токсичных",
                    value: `${result.toxicPercent}%`,
                    danger: result.toxicPercent > 50,
                    },
                ]}
                />

                <PostCommentsSection variant="result" />

                <div className="h-fit gap-[10px] px-[10px] py-[10px] bg-white-custom flex justify-center">
                    <AppButton
                        variant="checkAnother"
                        onClick={() => {
                            setStatus("idle");
                            setResult(null);
                        }}
                    >
                    Проверить другой пост
                    </AppButton>
                </div>
            </>     

        )}

        {(status === "idle" ||
          status === "filled" ||
          status === "error") && <PostInfoSection />}

        
        {status === "analysisError" && (
            <>
                <PostAnalysisSection
                variant="result"
                items={[
                    {
                        icon: "/analysis cards icons/comments.png",
                        title: "Всего комментариев",
                        value: "×",
                    },
                    {
                        icon: "/analysis cards icons/card offense.png",
                        title: "Оскорбление",
                        value: "×",
                    },
                    {
                        icon: "/analysis cards icons/card toxicity.png",
                        title: "Токсичных",
                        value: "×",
                    },
                    {
                        icon: "/analysis cards icons/toxic percent.png",
                        title: "Доля токсичных",
                        value: "×",
                    },
                ]}
                />

                <PostCommentsSection
                    variant="error"
                    errorMessage="Не удалось загрузить комментарии. Убедитесь, что пост открыт и комментарии доступны."
                />

                <div className="h-fit gap-[10px] px-[10px] py-[10px] bg-white-custom flex justify-center">
                    <AppButton
                        variant="checkAnother"
                        onClick={() => {
                            setStatus("idle");
                            setResult(null);
                        }}
                    >
                    Проверить другой пост
                    </AppButton>
                </div>
            </>
        )}


      </div>
    </section>
  );
}