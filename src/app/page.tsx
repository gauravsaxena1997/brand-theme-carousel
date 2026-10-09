import { BrandThemes } from "@/components/landing/landing-brand-themes";

const filler =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae massa sed justo feugiat posuere. Integer at lectus sed neque consequat ullamcorper.";

export default function Page() {
  return (
    <main>
      <section
        className="scroll-content"
        aria-label="Scroll content above the carousel"
      >
        <p>{filler}</p>
        <p>{filler}</p>
        <p>{filler}</p>
      </section>
      <BrandThemes />
      <section
        className="scroll-content scroll-content--bottom"
        aria-label="Scroll content below the carousel"
      >
        <p>{filler}</p>
        <p>{filler}</p>
        <p>{filler}</p>
      </section>
    </main>
  );
}
