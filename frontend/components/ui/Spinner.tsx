type Props = {
  size?: number;
};

export default function Spinner({ size = 33 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-[4px] border-grey-blue border-t-dark-grey rounded-full animate-spin"
    />
  );
}