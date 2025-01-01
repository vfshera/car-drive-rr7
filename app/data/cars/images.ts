import carOne from "~/assets/images/car-one.webp";
import carThree from "~/assets/images/car-three.webp";
import carTwo from "~/assets/images/car-two.webp";

export const homeImages = [carOne, carTwo, carThree];

export function getHomeImage(index?: number) {
  const size = homeImages.length;

  if (index && index >= 0 && index < size) {
    return homeImages[index];
  }

  return homeImages[Math.floor(Math.random() * size)];
}
