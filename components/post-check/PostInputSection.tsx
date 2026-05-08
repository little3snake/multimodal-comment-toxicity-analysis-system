"use client";

import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import type { PostResult, PostStatus } from "./PostMainSection";

type Props = {
  status: PostStatus;
  setStatus: (status: PostStatus) => void;
  setResult: (result: PostResult) => void;
};

export default function PostInputSection({
  status,
  setStatus,
  setResult,
}: Props) {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isFilled = url.trim().length > 0;
  const isError = status === "error";

  function handleClear() {
    setUrl("");
    setStatus("idle");
    setErrorMessage("");
  }

  function handleCheck() {
    if (!isFilled || status === "loading") return;

    const isValid = url.includes("vk.com") || url.includes("reddit.com");

    if (!isValid) {
      setStatus("error");
      setErrorMessage(
        "Ссылка должна вести на пост VK или Reddit с открытыми комментариями"
      );
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      setResult({
        totalComments: 17,
        offenseCount: 5,
        toxicCount: 9,
        toxicPercent: 52,
      });

      setStatus("result");
    }, 2000);

    /*setTimeout(() => {
        setStatus("analysisError");
    }, 2000);*/
  }

  return (
    <div className="w-full h-fit bg-silver px-[48px] py-[23px] flex items-start gap-[34px]">
      <div className="w-[954px] h-fit min-h-[342px] bg-white-custom rounded-[20px] gap-[10px] pb-[40px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="w-full h-[52px] bg-tint-5 flex items-center justify-center">
          <h1 className="text-[20px] leading-[28px] font-semibold text-dark-grey">
            Вставить ссылку на пост
          </h1>
        </div>

        <div className="w-full h-fit min-h-[240px] px-[40px] pt-[20px] flex flex-col items-center gap-[40px]">
          <p className="w-fit h-[28px] text-[18px] leading-[28px] text-light-grey text-center">
            Введите URL ссылку на пост из VK или Reddit
          </p>

          <div className="w-full flex flex-col items-center gap-[10px]">
            <div
              className={`w-full h-[48px] bg-silver rounded-[20px] border-2 px-[20px] py-[10px] relative flex items-center ${
                isError ? "border-toxic" : "border-grey-blue"
              }`}
            >
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                placeholder="url ссылка"
                disabled={status === "loading" || status === "result"}
                className={`w-[806px] h-[28px] bg-transparent outline-none text-[18px] leading-[28px] placeholder:text-grey-blue ${
                  isError ? "text-toxic" : "text-grey"
                }`}
              />

              {isFilled && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={status === "loading" || status === "result"}
                  className={`absolute right-[20px] top-[10px] w-[28px] h-[28px] text-[28px] leading-[28px] ${
                    isError ? "text-toxic" : "text-light-grey"
                  }`}
                >
                  ×
                </button>
              )}
            </div>

            {isError && (
              <p className="text-[14px] leading-[20px] text-toxic text-center">
                {errorMessage}
              </p>
            )}
          </div>

          {status !== "result" && (
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
        className="w-[253px] h-[254px] object-contain shrink-0 mt-[54px]"
      />
    </div>
  );
}