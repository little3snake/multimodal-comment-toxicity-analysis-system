import InfoSection from "@/components/info/InfoSection";

export default function PostInfoSection() {
  return (
    <InfoSection
      leftText={
        <>
          Что мы анализируем:
          <br />• комментарии под постом
          <br />• уровень токсичности
          <br />
          обсуждения
          <br />• наличие оскорблений
        </>
      }
      rightText={
        <>
          Поддерживаемые источники:{" "}
          <span className="text-primary">VK и Reddit</span>
          <br />
          <br />
          Требования:
          <br />• публичные посты
          <br />• доступные комментарии
        </>
      }
    />
  );
}