import Rand from "./rand";

// To prevent to be optimize out, please declare the full color classes
// in the below "It will generate" or in your code. Thanks!
export const supportedColorList = [
  "red",
  "blue",
  "yellow",
  "green",
  "pink",
] as const;

export type TSupportedColorList = typeof supportedColorList[number];

export function randColor(): TSupportedColorList {
  const choseColor = supportedColorList[Rand(0, supportedColorList.length - 1)];

  if (!choseColor)
    throw new Error(
      "Exception: randBackgroundColor(), choseColor == undefined"
    );

  return choseColor;
}

export const backgroundColorConfiguration = (
  color: TSupportedColorList,
  withHover = true
) => `bg-${color}-50 ${withHover && `hover:bg-${color}-900`}`;

/**
 * Generate a random background color.
 *
 * It will generate:
 *
 * ```
 * bg-red-50 hover:bg-red-900 bg-blue-50 hover:bg-blue-900
 * bg-yellow-50 hover:bg-yellow-900 bg-green-50 hover:bg-green-900
 * bg-pink-50 hover:bg-pink-900
 * ```
 *
 * @param withHover generate the hover variant
 */
export function randBackgroundColor(withHover = true): string {
  const c = randColor();

  return backgroundColorConfiguration(c, withHover);
}

export const textColorConfiguration = (
  color: TSupportedColorList,
  withHover = true
) => `text-${color}-400 ${withHover && `hover:text-${color}-900`}`;

/**
 * Generate a random text color.
 *
 * It will generate:
 *
 * ```
 * text-red-400 hover:text-red-900 text-blue-400 hover:text-blue-900
 * text-yellow-400 hover:text-yellow-900 text-green-400 hover:text-green-900
 * text-pink-400 hover:text-pink-900
 * ```
 *
 * @param withHover generate the hover variant
 */
export function randTextColor(withHover = true): string {
  const c = randColor();

  return textColorConfiguration(c, withHover);
}
