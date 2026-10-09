import type { ImageLoaderProps } from "next/image";

export function imageLoaderFor(
  assets: readonly {
    src: string;
    variants: readonly { width: number; src: string }[];
  }[],
) {
  return ({ src, width }: ImageLoaderProps) => {
    const asset = assets.find((asset) => asset.src === src);
    return (
      asset?.variants.find((variant) => variant.width >= width)?.src ?? src
    );
  };
}
