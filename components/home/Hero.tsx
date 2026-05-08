"use client";

import AppButton from "@/components/ui/AppButton";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="h-[514px] bg-silver flex justify-center">
      <div className="w-[1440px] h-full px-[80px] pt-[32px] flex items-start justify-between gap-[34px]">
        {/* Text */}
        <div className="w-[772px] h-fit max-h-[460px] gap-[5px] flex flex-col items-start overflow-y-auto">
          <h1 className="text-[64px] leading-[76px] font-semibold text-dark-grey">
            Система анализа токсичности интернет-комментариев
          </h1>

          <p className="mt-[8px] w-[772px] text-[18px] leading-[28px] font-bold text-grey">
            Определяет токсичность и наличие оскорблений в тексте и изображениях
            с использованием методов машинного обучения
          </p>

          <div className="mt-[50px]">
            <AppButton
              variant="start"
              onClick={() => router.push("/image")}
            >
              Начать
            </AppButton>
          </div>
        </div>

        {/* Illustration */}
        <img
          src="/hero with pc.png"
          alt="Hero illustration"
          className="w-[467px] h-[404px] object-contain shrink-0"
        />
      </div>
    </section>
  );
}