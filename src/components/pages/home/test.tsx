import { Apartment } from "./Apartment";
import { House } from "./House";
import hemmaPage00491 from "./hemma-page-0049-1.svg";

interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: "apartment" | "house";
}

export const MacbookPro = (): JSX.Element => {
  const stats: StatItem[] = [
    {
      id: "projects",
      value: "300",
      label: "مشروع مختلف",
      icon: "apartment",
    },
    {
      id: "units",
      value: "173k+",
      label: "وحدة مباعة",
      icon: "house",
    },
  ];

  return (
    <section
      className="flex flex-col w-[1311px] h-[634px] items-center justify-between p-11 relative bg-[#979797] rounded-[17.5px] overflow-hidden"
      aria-label="Company statistics and mission statement"
    >
      <img
        className="absolute left-[calc(50.00%_-_656px)] bottom-[-170px] w-[1310px] h-[634px] aspect-[1.78] object-cover"
        alt="Hemma brand background"
        src={hemmaPage00491}
      />

      <header className="self-stretch mt-[-590.88px] [font-family:'GE_Dinar_Two_Medium-Medium',Helvetica] font-medium text-base [direction:rtl] relative text-white tracking-[0] leading-[normal]">
        #همه_محل_الثقة
      </header>

      <div className="flex items-end justify-between relative self-stretch w-full flex-[0_0_auto] mt-[-590.88px]">
        <div className="flex flex-col w-[261.62px] items-end justify-end gap-[30.62px] relative">
          {stats.map((stat) => (
            <article
              key={stat.id}
              className="flex items-center gap-[30.62px] relative self-stretch w-full flex-[0_0_auto]"
              aria-labelledby={`stat-${stat.id}-value`}
            >
              <div className="flex flex-col w-[143.5px] items-end justify-center relative">
                <div
                  id={`stat-${stat.id}-value`}
                  className="flex items-center justify-center w-[132.12px] h-[63.88px] mt-[-0.88px] [font-family:'Urbanist-Regular',Helvetica] font-normal text-6xl text-right whitespace-nowrap relative text-white tracking-[0] leading-[normal]"
                >
                  {stat.value}
                </div>

                <p className="relative self-stretch h-[22.75px] [font-family:'GE_Dinar_Two_Medium-Medium',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
                  {stat.label}
                </p>
              </div>

              <div
                className="relative w-[87.5px] h-[87.5px] bg-[#ffffff1a] rounded-[87.5px] overflow-hidden border-[1.75px] border-solid border-white backdrop-blur-[8.75px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(8.75px)_brightness(100%)]"
                aria-hidden="true"
              >
                {stat.icon === "apartment" ? (
                  <Apartment className="!absolute !top-[calc(50.00%_-_19px)] !left-[calc(50.00%_-_19px)] !w-[39px] !h-[39px]" />
                ) : (
                  <House className="!absolute !top-[calc(50.00%_-_19px)] !left-[calc(50.00%_-_19px)] !w-[39px] !h-[39px]" />
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col w-[733px] items-end justify-center gap-5 relative">
          <h1 className="self-stretch mt-[-1.00px] [font-family:'GE_Dinar_Two_Medium-Medium',Helvetica] font-medium text-[40px] [direction:rtl] relative text-white tracking-[0] leading-[normal]">
            نعمل وفق رؤية استراتيجية واضحة تهدف إلى تقديم قيمة فعلية في سوق
            العقار السعودي،
          </h1>

          <p className="self-stretch opacity-80 [font-family:'GE_Dinar_Two_Medium-Medium',Helvetica] font-medium text-base [direction:rtl] relative text-white tracking-[0] leading-[normal]">
            عبر بناء تجربة تسويقية متكاملة تبرز جودة المنتج العقاري وتساعد
            العملاء على اتخاذ قرارات دقيقة وثابتة.
          </p>
        </div>
      </div>
    </section>
  );
};
