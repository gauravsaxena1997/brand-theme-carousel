import { getImageProps } from "next/image";
import { imageLoaderFor } from "./landing-image-loader";
import { themeScenes } from "./landing-theme-config";
type Scene = (typeof themeScenes)[number];
type Asset = Scene["assets"]["phoneDesktop"];

function LayerPicture({
  desktop,
  mobile,
  className,
  sizes,
}: {
  desktop: Asset;
  mobile: Asset;
  className: string;
  sizes: string;
}) {
  const loader = imageLoaderFor([desktop, mobile]);
  const { props: wide } = getImageProps({
    ...desktop,
    alt: "",
    sizes,
    loader,
    loading: "lazy",
  });
  const { props: narrow } = getImageProps({
    ...mobile,
    alt: "",
    sizes,
    loader,
  });
  return (
    <picture className={className}>
      <source media="(max-width: 699px)" srcSet={narrow.srcSet} sizes={sizes} />
      <img {...wide} alt="" />
    </picture>
  );
}

export function ThemeScene({
  scene,
  phase,
}: {
  scene: Scene;
  phase: "settled" | "incoming" | "outgoing";
}) {
  const { assets } = scene;
  return (
    <div
      className="landing-theme-scene"
      data-phase={phase}
      data-theme={scene.id}
      aria-hidden={phase === "outgoing"}
    >
      <LayerPicture
        desktop={assets.backdropDesktop}
        mobile={assets.backdropMobile}
        className="landing-theme-backdrop"
        sizes="100vw"
      />
      <div className="landing-theme-wordmark" aria-hidden="true">
        {scene.wordmark}
      </div>
      <div className="landing-theme-phone landing-theme-layer">
        <LayerPicture
          desktop={assets.phoneDesktop}
          mobile={assets.phoneDesktop}
          className="landing-theme-picture"
          sizes="(max-width: 699px) 58vw, 30vw"
        />
      </div>
      <div className="landing-theme-base landing-theme-layer">
        <LayerPicture
          desktop={assets.baseDesktop}
          mobile={assets.baseDesktop}
          className="landing-theme-picture"
          sizes="(max-width: 699px) 78vw, 65vw"
        />
      </div>
      <ThemeIngredients assets={assets} />
    </div>
  );
}

function ThemeIngredients({ assets }: { assets: Scene["assets"] }) {
  return (
    <>
      {assets.leaves.map((leaf, index) => (
        <div
          key={leaf.src}
          className={`landing-theme-leaf landing-theme-leaf-${index + 1} landing-theme-layer`}
        >
          <LayerPicture
            desktop={leaf}
            mobile={leaf}
            className="landing-theme-picture"
            sizes="12vw"
          />
        </div>
      ))}
    </>
  );
}
