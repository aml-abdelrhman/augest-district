import { useTranslations } from "next-intl";
import ReactPlayer from "react-player";

// Render a YouTube video player

const HomeHeroSection = () => {
  const t = useTranslations();
  return (
    <section className="relative h-svh w-full overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2">
        <iframe
          src="https://www.youtube.com/embed/qN8qF7tYu4M?autoplay=1&mute=1&loop=1&playlist=qN8qF7tYu4M&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
          className="w-full h-full border-none"
          allow="autoplay; fullscreen"
          title="Hero Video"
        />
      </div>
    </section>
  );
};

export default HomeHeroSection;
