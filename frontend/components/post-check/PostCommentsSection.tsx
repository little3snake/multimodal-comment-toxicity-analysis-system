"use client";

import { useMemo, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import AnalysisErrorFrame from "@/components/analysis/AnalysisErrorFrame";

type FilterType = "all" | "toxic" | "safe";

type PostComment = {
  id: number;
  text: string;
  toxicity: number;
  hasOffense: boolean;
  isToxic: boolean;
};

type Props = {
  variant: "loading" | "result" | "error";
  comments?: PostComment[];
  errorMessage?: string;
};

const mockComments: PostComment[] = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elit quis erat pharetra fringilla quis et turpis. Vestibulum ullamcorper mauris ut tempus consequat. In dapibus pellentesque mollis. Cras a bibendum nibh, in vestibulum ex. Mauris vehicula velit ac maximus bibendum. Pellentesque diam nisi, feugiat et pharetra a, auctor ut lorem. ",
    toxicity: 47,
    hasOffense: false,
    isToxic: false,
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elit quis erat pharetra fringilla quis et turpis.",
    toxicity: 89,
    hasOffense: true,
    isToxic: true,
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus pellentesque mollis.",
    toxicity: 7,
    hasOffense: true,
    isToxic: true,
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a bibendum nibh.",
    toxicity: 17,
    hasOffense: false,
    isToxic: false,
  },
  {
    id: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque diam nisi, feugiat et pharetra a, auctor ut lorem.",
    toxicity: 56,
    hasOffense: true,
    isToxic: true,
  },
  {
    id: 6,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper mauris ut tempus consequat.",
    toxicity: 47,
    hasOffense: false,
    isToxic: false,
  },
  {
    id: 7,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elit quis erat pharetra fringilla.",
    toxicity: 89,
    hasOffense: true,
    isToxic: true,
  },
  {
    id: 8,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    toxicity: 7,
    hasOffense: true,
    isToxic: true,
  },
  {
    id: 9,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus pellentesque mollis.",
    toxicity: 17,
    hasOffense: false,
    isToxic: false,
  },
  {
    id: 10,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula velit ac maximus bibendum.",
    toxicity: 56,
    hasOffense: true,
    isToxic: true,
  },
];

function getToxicityColor(toxicity: number) {
  if (toxicity > 50) return "text-toxic";
  if (toxicity > 25) return "text-grey-blue";
  return "text-good";
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
  comments = mockComments,
  errorMessage,
}: Props) {
  const [filter, setFilter] = useState<FilterType>("all");

  const isLoading = variant === "loading";
  const isError = variant === "error";

  const filteredComments = useMemo(() => {
    if (filter === "toxic") {
      return comments.filter((comment) => comment.isToxic);
    }

    if (filter === "safe") {
      return comments.filter((comment) => !comment.isToxic);
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
                    "Не удалось загрузить комментарии. Убедитесь, что пост открыт и комментарии доступны."
                }
            />
        ) : (
          <div className="w-full max-h-[800px] overflow-y-scroll custom-scrollbar flex flex-col gap-[10px]">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="w-full min-h-[84px] flex items-stretch gap-[10px] py-[10px] items-stretch"
              >
                <div className="w-[980px] relative pl-[9px] pr-[10px] py-[10px] flex items-start">
                  <div
                    className={`absolute left-0 top-[10px] w-[8px] h-full rounded-l-full ${
                      comment.isToxic ? "bg-toxic" : "bg-good"
                    }`}
                  />

                  <p className="text-[18px] leading-[28px] text-dark-grey">
                    {comment.text}
                  </p>
                </div>

                <div className="w-[100px] rounded-[10px] border border-tint-5 flex items-center justify-center">
                  <p
                    className={`text-[28px] leading-[36px] font-bold ${getToxicityColor(
                      comment.toxicity
                    )}`}
                  >
                    {comment.toxicity}%
                  </p>
                </div>

                <div className="w-[100px] rounded-[10px] border border-tint-5 flex items-center justify-center">
                  <p
                    className={`text-[28px] leading-[36px] font-bold ${
                      comment.hasOffense ? "text-toxic" : "text-good"
                    }`}
                  >
                    {comment.hasOffense ? "да" : "нет"}
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