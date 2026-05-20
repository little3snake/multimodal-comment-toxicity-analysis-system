"use client";

import { useMemo, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import AnalysisErrorFrame from "@/components/analysis/AnalysisErrorFrame";

type FilterType = "all" | "toxic" | "safe";

type PostComment = {
  comment_id: number | string;
  author_id: number | string;
  date: string;
  text: string;
  image_urls: string[];
  is_reply: boolean;
  reply_to_comment: number | string | null;
  toxicity: number;
  offense: boolean;
};

type Props = {
  variant: "loading" | "result" | "error";
  comments?: PostComment[];
  errorMessage?: string;
};

function getToxicityColor(toxicity: number) {
  if (toxicity > 75) return "text-toxic";
  if (toxicity > 50) return "text-grey-blue";
  return "text-good";
}

function cleanCommentText(text: string) {
  return text.replace(/\[id\d+\|([^\]]+)\]/g, "$1");
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-[128px] h-[40px] border-2 border-tint-5 text-[18px] leading-[28px] ${
        active ? "text-primary" : "text-light-grey"
      }`}
    >
      {children}
    </button>
  );
}

export default function PostCommentsSection({
  variant,
  comments = [],
  errorMessage,
}: Props) {
  const [filter, setFilter] = useState<FilterType>("all");

  const isLoading = variant === "loading";
  const isError = variant === "error";

  const filteredComments = useMemo(() => {
    if (filter === "toxic") {
      return comments.filter((comment) => comment.toxicity >= 75);
    }

    if (filter === "safe") {
      return comments.filter((comment) => comment.toxicity < 75);
    }

    return comments;
  }, [comments, filter]);

  return (
    <div className="h-fit bg-white-custom flex justify-center">
      <div className="w-[1200px] h-fit px-[48px] pb-[30px] flex flex-col items-center gap-[16px]">
        <h2 className="text-[36px] leading-[44px] font-semibold text-dark-grey text-center">
          Комментарии
        </h2>

        <div className="w-full flex items-center gap-[16px]">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            Все
          </FilterButton>

          <FilterButton active={filter === "toxic"} onClick={() => setFilter("toxic")}>
            Токсичные
          </FilterButton>

          <FilterButton active={filter === "safe"} onClick={() => setFilter("safe")}>
            Безопасные
          </FilterButton>
        </div>

        <div className="w-full h-fit gap-[5px] py-[1px] flex items-center text-[16px] leading-[24px] font-medium text-dark-grey">
          <p className="w-[979px] h-[38px] py-[7px] gap-[10px] text-center">текст комментария</p>
          <p className="w-[101px] h-[38px] py-[7px] gap-[10px] text-center">токсичность</p>
          <p className="w-[110px] h-[38px] py-[7px] gap-[10px] text-center">оскорбление</p>
        </div>

        {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center">
                <Spinner size={64} />
            </div>
        ) : isError ? (
            <AnalysisErrorFrame
                message={
                    errorMessage ||
                    "Не удалось загрузить комментарии. Убедитесь, что ресурс существует, открыт и комментарии доступны."
                }
            />
        ) : (
          <div className="w-full max-h-[800px] overflow-y-scroll custom-scrollbar flex flex-col gap-[10px]">
            {/* {filteredComments.map((comment) => (
              <div
                key={comment.comment_id}
                className="w-full min-h-[84px] flex items-stretch gap-[10px]"
              >
                <div className="w-[980px] min-h-[84px] relative pl-[16px] pr-[10px] py-[10px] flex items-start">
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[8px] rounded-l-full ${
                      comment.toxicity >= 75 ? "bg-toxic" : "bg-good"
                    }`}
                  />

                  <p className="text-[18px] leading-[28px] text-dark-grey">
                    {cleanCommentText(comment.text)}
                  </p>
                </div>

                <div className="w-[100px]  min-h-[84px] rounded-[10px] border border-tint-5 flex items-center justify-center shrink-0">
                  <p
                    className={`text-[28px] leading-[36px] font-bold ${getToxicityColor(
                      comment.toxicity
                    )}`}
                  >
                    {comment.toxicity}%
                  </p>
                </div>

                <div className="w-[100px] min-h-[84px] rounded-[10px] border border-tint-5 flex items-center justify-center shrink-0">
                  <p
                    className={`text-[28px] leading-[36px] font-bold ${
                      comment.offense ? "text-toxic" : "text-good"
                    }`}
                  >
                    {comment.offense ? "да" : "нет"}
                  </p>
                </div>
              </div>
            ))}*/}
            {filteredComments.map((comment) => (
              <div
                key={comment.comment_id}
                className="grid grid-cols-[1fr_100px_100px] gap-[10px] w-full items-stretch"
              >
                <div className="min-h-[84px] relative pl-[16px] pr-[16px] py-[10px]">
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[8px] rounded-l-full ${
                      comment.toxicity >= 70 ? "bg-toxic" : "bg-good"
                    }`}
                  />

                  <p className="text-[18px] leading-[28px] text-dark-grey break-words whitespace-pre-wrap">
                    {cleanCommentText(comment.text)}
                  </p>
                </div>

                <div className="min-h-[84px] rounded-[10px] border border-tint-5 flex items-center justify-center">
                  <p
                    className={`text-[28px] leading-[36px] font-bold ${getToxicityColor(
                      comment.toxicity
                    )}`}
                  >
                    {comment.toxicity}%
                  </p>
                </div>

                <div className="min-h-[84px] rounded-[10px] border border-tint-5 flex items-center justify-center">
                  <p
                    className={`text-[28px] leading-[36px] font-bold ${
                      comment.offense ? "text-toxic" : "text-good"
                    }`}
                  >
                    {comment.offense ? "да" : "нет"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}