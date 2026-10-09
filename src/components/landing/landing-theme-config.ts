import assets from "./landing-theme-assets.json";
import coffeeAssets from "./landing-coffee-theme-assets.json";
import sushiAssets from "./landing-sushi-theme-assets.json";
import pizzaAssets from "./landing-pizza-theme-assets.json";

export const themeContent = {
  title: "Your menu. Your kind of place.",
  description:
    "Give your digital menu the colours and character of your venue.",
};
export const themeMotion = {
  duration: 1500,
  narrowViewport: "(max-width: 699px)",
  mobileTravelScale: 0.45,
};
export const themeScenes = [
  {
    id: "matcha",
    name: "Matcha",
    wordmark: "MORI",
    description:
      "A moss-green café menu beside an iced matcha latte on stone, with floating tea leaves.",
    colour: "#596442",
    assets,
  },
  {
    id: "pizza",
    name: "Pizza",
    wordmark: "FORNO",
    description:
      "A warm terracotta pizzeria menu beside margherita on walnut, with floating basil, tomato, parmesan and chilli.",
    colour: "#a65d43",
    assets: pizzaAssets,
  },
  {
    id: "coffee",
    name: "Coffee",
    wordmark: "EMBER",
    description:
      "A warm espresso café menu beside a ceramic latte on walnut, with floating coffee beans.",
    colour: "#946a46",
    assets: coffeeAssets,
  },
  {
    id: "sushi",
    name: "Sushi",
    wordmark: "SORA",
    description:
      "An ivory and red Japanese menu beside sushi on a limestone base, with floating nori, sesame, ginger and shiso.",
    colour: "#39312e",
    assets: sushiAssets,
  },
];
