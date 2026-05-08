import InfoSection from "@/components/info/InfoSection";

export default function TextInfoSection() {
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
          Поддерживаемые данные:
          <br />
          <span className="text-primary">любой комментарий</span>
          <br />
          Максимальный размер:{" "}
          <span className="text-primary">
            до
            <br />
            1000–2000 символов
          </span>
        </>
      }
    />
  );
}