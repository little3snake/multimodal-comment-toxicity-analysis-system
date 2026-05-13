"use client";

import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import type { TextResult, TextStatus } from "./TextMainSection";

type Props = {
  status: TextStatus;
  setStatus: (status: TextStatus) => void;
  setResult: (result: TextResult) => void;
};

export default function TextInputSection({
  status,
  setStatus,
  setResult,
}: Props) {
  const [text, setText] = useState("");

  const isFilled = text.trim().length > 0;

  async function handleCheck() {
    if (!isFilled || status === "loading") return;

    setStatus("loading");

    /*setTimeout(() => {
      setResult({
        toxicity: 72,
        offense: false,
        comment:
          "Комментарий имеет высокую токсичность, но явные оскорбления моделью не выявлены.",
      });

      setStatus("result");
    }, 2000);*/
    /*setTimeout(() => {
      setStatus("analysisError");
     }, 2000);
     setStatus("loading");*/

    try {
      const response = await fetch("http://localhost:8000/analyze/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Text analysis failed");
      }

      const data = await response.json();

      setResult(data);
      setStatus("result");
    } catch (error) {
      setStatus("analysisError");
    }

  }

  return (
    <div className="w-full h-[514px] bg-silver px-[48px] py-[23px] flex justify-center items-start gap-[34px]">
      <div className="w-[954px] h-full gap-[10px] pb-[30px] bg-white-custom rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="w-full h-[52px] bg-tint-5 flex items-center justify-center">
          <h1 className="text-[20px] leading-[28px] font-semibold text-dark-grey">
            Вставить текст
          </h1>
        </div>

        <div className="w-full px-[40px] pt-[20px] flex flex-col items-center gap-[35px]">
          <p className="w-fit h-fit text-[18px] leading-[28px] text-light-grey text-center">
            Введите текст, чтобы начать анализ
          </p>

          <div className="w-[788px] h-[200px] bg-silver rounded-[20px] border-2 border-grey-blue px-[20px] py-[10px] relative flex">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              disabled={status === "loading" || status === "result" || status === "analysisError"}
              placeholder="текст"
              className="w-[705px] h-full bg-transparent resize-none outline-none text-[18px] leading-[28px] text-grey placeholder:text-grey-blue disabled:cursor-default"
            />

            <button
              type="button"
              onClick={() => setText("")}
              disabled={status === "loading" || status === "result" || status === "analysisError"}
              className="absolute right-[20px] top-[10px] w-[28px] h-[28px] text-light-grey text-[28px] leading-[28px] disabled:cursor-default"
            >
              ×
            </button>
          </div>

          {status !== "result" && status !== "analysisError" && (
            <AppButton
              variant={
                status === "loading"
                  ? "checking"
                  : isFilled
                    ? "default"
                    : "disabled"
              }
              onClick={handleCheck}
            >
              {status === "loading" ? "Проверяем" : "Проверить"}
            </AppButton>
          )}
        </div>
      </div>

      <img
        src="/hero.png"
        alt="hero"
        className="w-[253px] h-[254px] object-contain shrink-0 mt-[98px]"
      />
    </div>
  );
}