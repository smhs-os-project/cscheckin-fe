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

export function randBackgroundColor(withHover = true): string {
  const c = randColor();

  return `bg-${c}-50 ${withHover && `hover:bg-${c}-900`}`;
}

export function randTextColor(withHover = true): string {
  const c = randColor();

  return `text-${c}-400 ${withHover && `hover:text-${c}-900`}`;
}
