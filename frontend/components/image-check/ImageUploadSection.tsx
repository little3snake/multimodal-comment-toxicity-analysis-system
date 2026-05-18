"use client";

import { useRef, useState } from "react";
import AppButton from "@/components/ui/AppButton";
import type { ImageResult, ImageStatus } from "./ImageMainSection";

type Props = {
  status: ImageStatus;
  setStatus: (status: ImageStatus) => void;
  setResult: (result: ImageResult) => void;
};

export default function ImageUploadSection({ status, setStatus, setResult}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleChooseFile() {
    if (status !== "idle") return;
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setStatus("uploaded");
  }

  async function handleCheck() {
    setStatus("loading");

    // временно, пока нет бэкенда
    // потом здесь будет запрос на сервер
    // Потом setTimeout заменить на fetch
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
    }, 2000);*/

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze/image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка анализа");
      }

      const data = await response.json();

      setResult({
        toxicity: data.toxicity,
        offense: data.offense,
        comment: data.comment,
      });

      setStatus("result");
    } catch (error) {
      console.error(error);
      setStatus("analysisError");
    }
  }
    

  return (
    <div className="w-full h-[514px] bg-silver px-[48px] py-[23px] flex justify-center items-start gap-[34px]">
      <div className="w-[954px] h-full bg-white-custom rounded-[20px] pb-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="w-full h-[52px] bg-tint-5 flex items-center justify-center rounded-t-[20px]">
          <h1 className="text-[20px] leading-[28px] font-semibold text-dark-grey">
            Загрузить изображение
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="w-fit max-w-[954px] h-[383px] flex flex-col items-center pt-[20px]">
            {status === "idle" && (
              <>
                <p className="w-fit max-w-[954px] h-[56px] text-[18px] leading-[28px] text-light-grey text-center overflow-y-auto">
                  Перетащите изображение сюда
                  <br />
                  или нажмите для загрузки
                </p>

                <img
                  src="/upload icons/image.png"
                  alt="Upload image"
                  className="w-[164px] h-[138px] object-contain mt-[13px]"
                />

                <div className="mt-[50px]">
                  <AppButton variant="chooseFile" onClick={handleChooseFile}>
                    Выбрать файл
                  </AppButton>
                </div>
              </>
            )}

            {status === "uploaded" && file && previewUrl && (
              <>
                <p className="w-fit max-w-[954px] h-[56px] text-[18px] leading-[28px] text-light-grey text-center overflow-y-auto">
                  {file.name}
                </p>

                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="w-[135px] h-[137px] object-cover border-[3px] border-light-grey mt-[13px]"
                />

                <div className="mt-[13px]">
                  <AppButton variant="chooseFileDisabled">
                    Выбрать файл
                  </AppButton>
                </div>

                <div className="mt-[13px]">
                  <AppButton variant="default" onClick={handleCheck}>
                    Проверить
                  </AppButton>
                </div>
              </>
            )}

            {status === "loading" && file && previewUrl && (
              <>
                <p className="w-fit max-w-[954px] h-[56px] text-[18px] leading-[28px] text-light-grey text-center overflow-y-auto">
                  {file.name}
                </p>

                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="w-[135px] h-[137px] object-cover border-[3px] border-light-grey mt-[13px]"
                />

                <p className="mt-[13px] w-[391px] h-[50px] text-[20px] leading-[25px] font-semibold text-light-grey text-center">
                  Анализируем изображение...
                  <br />
                  Это может занять несколько секунд
                </p>

                <div className="mt-[10px]">
                  <AppButton variant="checking">
                    Проверяем
                  </AppButton>
                </div>
              </>
            )}

            {(status === "result" || status === "analysisError") && file && previewUrl && (
              <>
                <p className="text-[18px] leading-[28px] text-light-grey text-center">
                  {file.name}
                </p>

                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="w-[135px] h-[137px] object-cover border-[3px] border-light-grey mt-[13px]"
                />
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
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