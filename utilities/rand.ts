/**
 * Rand.ts - Generate a random number
 */

/**
 * Returns a random number between [min, max]
 */
export default function Rand(min = 0, max = 100): number {
  return Math.round(Math.random() * (max - min)) + min;
}
