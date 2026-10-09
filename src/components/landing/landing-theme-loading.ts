import { getImageProps } from "next/image";
import { imageLoaderFor } from "./landing-image-loader";
import { themeMotion, themeScenes } from "./landing-theme-config";

export async function prepareTheme(index: number) {
  const scene = themeScenes[index];
  if (!scene) return;
  const { assets } = scene;
  const mobile = window.matchMedia(themeMotion.narrowViewport).matches;
  const layers = [
    {
      asset: mobile ? assets.backdropMobile : assets.backdropDesktop,
      sizes: "100vw",
    },
    {
      asset: assets.phoneDesktop,
      sizes: "(max-width: 699px) 58vw, 30vw",
    },
    {
      asset: assets.baseDesktop,
      sizes: "(max-width: 699px) 78vw, 65vw",
    },
    ...assets.leaves.map((asset) => ({ asset, sizes: "12vw" })),
  ];
  await Promise.all(
    layers.map(async ({ asset, sizes }) => {
      const { props } = getImageProps({
        ...asset,
        alt: "",
        sizes,
        loader: imageLoaderFor([asset]),
      });
      const image = new Image();
      image.sizes = sizes;
      image.srcset = props.srcSet ?? "";
      image.src = props.src;
      await image.decode();
    }),
  );
}
