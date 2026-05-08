type CardProps = {
  icon: string;
  title: string;
  text: string;
};

function Card({ icon, title, text }: CardProps) {
  return (
    <div className="w-[160px] h-[160px] bg-white-custom rounded-[2.67px] shadow-[1px_4px_1.34px_rgba(0,0,0,0.08)] flex flex-col items-center px-[10px] py-[2px] text-center">
      <img
        src={icon}
        alt=""
        className="w-[140px] h-[36px] object-contain shrink-0"
      />

      <p className="mt-[2px] min-h-[40px] text-[14px] leading-[20px] font-medium text-dark-grey flex items-center">
        {title}
      </p>

      <p className="mt-[4px] text-[10px] leading-[14px] text-grey">
        {text}
      </p>
    </div>
  );
}

export default function Opportunities() {
  return (
    <section className="bg-white-custom flex justify-center py-[48px]">
      <div className="w-[1200px] flex flex-col items-center gap-[48px]">
        <h2 className="text-[36px] leading-[44px] font-semibold text-dark-grey">
          Возможности
        </h2>

        <div className="w-full flex justify-between gap-[76px]">
          <Card
            icon="/homepage icons opportunities/text.png"
            title="Анализ текстовых комментариев"
            text="Определяет токсичность и оскорбления в пользовательских сообщениях."
          />

          <Card
            icon="/homepage icons opportunities/image.png"
            title="Обработка изображений (OCR + анализ)"
            text="Извлекает текст с изображений и проверяет его на токсичность."
          />

          <Card
            icon="/homepage icons opportunities/offense.png"
            title="Определение оскорблений"
            text="Распознаёт агрессию, хейт и уничижительные выражения."
          />

          <Card
            icon="/homepage icons opportunities/url.png"
            title="Анализ комментариев по ссылке"
            text="Проверяет комментарии на странице или посте по URL."
          />

          <Card
            icon="/homepage icons opportunities/level of toxicity.png"
            title="Оценка уровня токсичности"
            text="Показывает уровень токсичности и степень риска контента."
          />
        </div>
      </div>
    </section>
  );
}