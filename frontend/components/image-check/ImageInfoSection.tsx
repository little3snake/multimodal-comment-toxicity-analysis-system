import InfoSection from "@/components/info/InfoSection";

export default function ImageInfoSection() {
  return (
    <InfoSection
      leftText={
        <>
          Что мы анализируем:
          <br />• токсичность текста
          <br />• наличие оскорблений
          <br />• общий смысл комментария
        </>
      }
      rightText={
        <>
          Поддерживаемые
          <br />
          форматы: <span className="text-primary">JPG, PNG</span>
          <br />
          Максимальный
          <br />
          размер: <span className="text-primary">до 5 MB</span>
        </>
      }
    />
  );
}