# Custom brand theme carousel

A standalone carousel with four hospitality brand themes:

1. Matcha / MORI
2. Pizza / FORNO
3. Coffee / EMBER
4. Sushi / SORA

The carousel includes its layered artwork, desktop and mobile framing, wordmarks, colors, transition timing, parallax, typography, reduced-motion behavior, heading, and controls. All responsive WebP artwork used by the four scenes is included under `public/landing/themes`.

The page has no site navigation or footer. Plain filler paragraphs above and below the original section make the page scrollable so the carousel's parallax can be viewed locally.

## Demo

<video src="./public/custom-brand-themes.mov" controls playsinline width="100%">
  <a href="./public/custom-brand-themes.mov">Watch the carousel demo</a>
</video>

The original demo video is included at [`public/custom-brand-themes.mov`](./public/custom-brand-themes.mov).

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Lucide React for the navigation arrows

## Artwork

All 64 responsive WebP files used by Matcha, Pizza, Coffee, and Sushi are included. They cover the desktop and mobile backdrops, menu phones, foreground bases, and separate floating ingredients. The image files total about 3.4 MB.

## Run locally

Requires Node.js 22 or newer and npm.

```sh
npm install
npm run dev
```

Open <http://localhost:3000>.

## Source

The component source and artwork were extracted from an existing landing page and can run independently from this repository.

## License

MIT. See [LICENSE](./LICENSE).
