import Spinner from "@/components/ui/Spinner";

type PostAnalysisItem = {
  icon: string;
  title: string;
  value?: string;
  danger?: boolean;
};

type Props = {
  variant: "loading" | "result";
  items?: PostAnalysisItem[];
};

function PostAnalysisCard({
  icon,
  title,
  value,
  danger,
  isLoading,
}: PostAnalysisItem & { isLoading: boolean }) {
  return (
    <div className="w-[262px] h-fit px-[10px] pt-[30px] pb-[20px] flex flex-col items-center gap-[3px] bg-white-custom shadow-[1px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col items-center gap-[8px]">
        <img src={icon} alt="" className="w-[42px] h-[36px]" />

        <p className="text-[18px] leading-[28px] font-medium text-dark-grey text-center">
          {title}
        </p>

        {isLoading ? (
          <div className="w-full flex justify-center items-center h-[36px]">
            <Spinner />
          </div>
        ) : (
          <p
            className={`text-[40px] leading-[48px] font-bold ${
                danger === true
                    ? "text-toxic"
                    : danger === false
                    ? "text-primary"
                    : "text-dark-grey"
            }`}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PostAnalysisSection({ variant, items }: Props) {
  const isLoading = variant === "loading";

  const loadingItems: PostAnalysisItem[] = [
    {
      icon: "/analysis cards icons/comments.png",
      title: "Всего комментариев",
    },
    {
      icon: "/analysis cards icons/card offense.png",
      title: "Оскорбление",
    },
    {
      icon: "/analysis cards icons/card toxicity.png",
      title: "Токсичных",
    },
    {
      icon: "/analysis cards icons/toxic percent.png",
      title: "Доля токсичных",
    },
  ];

  const currentItems = isLoading ? loadingItems : items ?? [];

  return (
    <div className="h-fit bg-white-custom flex justify-center">
      <div className="w-[1200px] h-fit px-[48px] pt-[10px] pb-[10px] flex flex-col items-center gap-[16px]">
        <h2 className="w-full h-[44px] text-[36px] leading-[44px] font-semibold text-dark-grey text-center">
          Результат анализа
        </h2>

        <div className="w-full h-fit flex items-start justify-between gap-[16px]">
          {currentItems.map((item) => (
            <PostAnalysisCard
              key={item.title}
              {...item}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}