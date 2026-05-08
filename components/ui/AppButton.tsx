import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

const withArrow: ButtonVariant[] = [
  "checkAnother",
  "backToMain",
  "start",
];


type ButtonVariant =
  | "default"
  | "disabled"
  | "checking"
  | "checkAnother"
  | "backToMain"
  | "chooseFile"
  | "chooseFileDisabled"
  | "start";

type AppButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
};

export default function AppButton({
  children,
  variant = "default",
  onClick,
}: AppButtonProps) {
  const styles: Record<ButtonVariant, string> = {
    default: "w-[211px] h-[52px] bg-primary text-white-custom",
    disabled: "w-[211px] h-[52px] bg-tint-5 text-white-custom cursor-not-allowed",
    checking: "w-[211px] h-[52px] bg-tint-5 text-white-custom cursor-wait",
    checkAnother: "w-[372px] h-[52px] bg-primary text-white-custom",
    backToMain: "w-[357px] h-[52px] bg-primary text-white-custom",
    chooseFile: "w-[176px] h-[41px] bg-primary text-white-custom",
    chooseFileDisabled: "w-[176px] h-[41px] bg-tint-5 text-white-custom cursor-not-allowed",
    start: "w-[211px] h-[52px] bg-primary text-white-custom",

  };

  return (
    <button
        onClick={onClick}
        disabled={variant === "disabled" || variant === "checking" || variant === "chooseFileDisabled"}
        className={`${styles[variant]} flex items-center justify-center rounded-[1.34px] px-[10.68px] py-[4.67px] text-[20px] leading-[28px] font-semibold`}
    >
        <span className="flex h-full w-full items-center justify-center gap-[8px]">
            {children}
            {withArrow.includes(variant) && <ArrowRightIcon />}
        </span>
    </button>
  );
}