import Rand from "./rand";

export function randColor(): string {
  const colorList = ["red", "blue", "yellow", "green", "pink"];
  const choseColor = colorList[Rand(0, colorList.length - 1)];

  if (!choseColor)
    throw new Error(
      "Exception: randBackgroundColor(), choseColor == undefined"
    );

  return choseColor;
}

export default function randBackgroundColor(withHover = true): string {
  const c = randColor();

  return `bg-${c}-50 ${withHover && `hover:bg-${c}-900`}`;
}
