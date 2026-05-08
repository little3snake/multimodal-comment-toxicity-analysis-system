type Props = {
  message: React.ReactNode;
};

export default function AnalysisErrorFrame({ message }: Props) {
  return (
    <div className="w-full h-fit px-[10px] py-[10px] flex items-center justify-center gap-[10px]">
      <img
        src="/analysis cards icons/error.png"
        alt="Ошибка"
        className="w-[53px] h-[53px]"
      />

      <p className="text-[20px] leading-[28px] font-semibold text-toxic text-center">
        {message}
      </p>
    </div>
  );
}