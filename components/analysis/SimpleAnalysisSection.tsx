import Spinner from "@/components/ui/Spinner";


type AnalysisItem = {
  icon: string;
  title: string;
  value?: string;
  danger?: boolean;
};

type Props = {
  variant: "loading" | "result" | "error";
  items: AnalysisItem[];
  comment?: string;
};

function AnalysisCard({
  icon,
  title,
  value,
  danger,
  isLoading,
  isError,
}: AnalysisItem & {
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="w-[265px] h-fit px-[10px] pt-[30px] pb-[20px] flex flex-col items-center rounded-[8px] gap-[3px] bg-white-custom shadow-[1px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="w-full h-fit flex flex-col items-center">
        <img src={icon} alt="" className="w-[40px] h-[36px]" />

        <p className=" w-full h-fit text-[18px] leading-[28px] font-medium text-dark-grey text-center">
          {title}
        </p>

        {isLoading ? (
            <div className="w-full flex justify-center items-center h-[36px]">
                <Spinner size={33} />
            </div>
        ) : (
            <p
            className={`w-full font-bold text-center ${
                isError
                ? "h-[36px] text-[36px] leading-[36px] text-dark-grey"
                : `h-[36px] text-[28px] leading-[36px] ${
                    danger ? "text-toxic" : "text-good"
                    }`
            }`}
            >
            {isError ? "×" : value}
            </p>
         )}
      </div>
    </div>
  );
}

export default function SimpleAnalysisSection({ variant, items, comment }: Props) {
  const isLoading = variant === "loading";
  const isError = variant === "error";

  return (
    <div className="h-fit bg-white-custom flex justify-center">
      <div className="w-[1200px] h-fit flex flex-col items-center gap-[16px]">
        <h2 className="w-full h-[44px] text-[36px] leading-[44px] font-semibold text-dark-grey text-center">
          Результат анализа
        </h2>

        <div className="w-[1200px] h-fit px-[48px] pb-[10px] gap-[100px] flex items-start justify-between">
          {items.map((item) => (
            <AnalysisCard
              key={item.title}
              {...item}
              isLoading={isLoading}
              isError={isError}
            />
          ))}

          <div className="w-[350px] h-[150px] px-[10px] pt-[15px] pb-[8px] flex flex-col items-center gap-[10px] bg-white-custom">
            <p className="w-full h-[28px] text-[18px] leading-[28px] font-medium text-dark-grey text-center">
              Комментарий анализа:
            </p>

            <div className="w-full h-full overflow-y-auto flex items-center justify-center">
              {isLoading ? (
                <Spinner />
            ) : (
                <p
                className={`text-center text-dark-grey ${
                    isError
                    ? "h-[36px] text-[36px] leading-[36px] font-bold"
                    : "text-[18px] leading-[28px]"
                }`}
                >
                {isError ? "×" : comment}
                </p>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}