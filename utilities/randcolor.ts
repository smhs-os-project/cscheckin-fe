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

export const backgroundColorConfiguration = (color: string, withHover = true) =>
  `bg-${color}-50 ${withHover && `hover:bg-${color}-900`}`;

export function randBackgroundColor(withHover = true): string {
  const c = randColor();

  return backgroundColorConfiguration(c, withHover);
}

export const textColorConfiguration = (color: string, withHover = true) =>
  `text-${color}-400 ${withHover && `hover:text-${color}-900`}`;

export function randTextColor(withHover = true): string {
  const c = randColor();

  return textColorConfiguration(c, withHover);
}
