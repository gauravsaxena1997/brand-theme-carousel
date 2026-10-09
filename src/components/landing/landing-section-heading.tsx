import "./landing-section-heading.css";

export function SectionHeading({
  text,
  id,
  className,
}: {
  text: string;
  id: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={["landing-section-heading", className]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
    </h2>
  );
}
