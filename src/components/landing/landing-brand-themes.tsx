import { Handwriting } from "./landing-handwriting";
import { SectionHeading } from "./landing-section-heading";
import { ThemeCarousel } from "./landing-theme-carousel";
import { themeContent } from "./landing-theme-config";
import themeHandwriting from "./landing-theme-handwriting.json";
import "./landing-brand-themes.css";

export function BrandThemes() {
  return (
    <section
      id="brand-themes"
      className="landing-brand-themes"
      aria-labelledby="brand-themes-title"
    >
      <div className="landing-theme-heading">
        <div>
          <SectionHeading id="brand-themes-title" text={themeContent.title} />
          <p>{themeContent.description}</p>
        </div>
        <Handwriting artwork={themeHandwriting} decoration="underline" />
      </div>
      <ThemeCarousel />
    </section>
  );
}
