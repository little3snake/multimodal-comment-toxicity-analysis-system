type InfoSectionProps = {
  leftText: React.ReactNode;
  rightText: React.ReactNode;
};

export default function InfoSection({ leftText, rightText }: InfoSectionProps) {
  return (
    <div className="h-fit bg-white-custom flex justify-center">
      <div className="w-[1200px] h-fit px-[20px] py-[29px] flex justify-center items-start gap-[100px]">
        <div className="w-[530px] h-[192px] px-[25px] py-[25px] gap-[10px] flex justify-center bg-white-custom shadow-[1px_4px_4px_rgba(0,0,0,0.25)]">
          <p className="w-fit max-w-full h-fit max-h-full text-[20px] leading-[28px] font-semibold text-dark-grey overflow-y-auto">
            {leftText}
          </p>
        </div>

        <div className="w-[530px] h-[192px] px-[25px] py-[25px] gap-[10px] flex justify-center bg-white-custom shadow-[1px_4px_4px_rgba(0,0,0,0.25)]">
          <p className="w-fit max-w-full h-fit max-h-full text-[20px] leading-[28px] font-semibold text-dark-grey overflow-y-auto">
            {rightText}
          </p>
        </div>
      </div>
    </div>
  );
}