export function clip(x: number, { min, max }: { min?: number; max?: number }): number {
  return Math.min(Math.max(x, min ?? Number.NEGATIVE_INFINITY), Number.POSITIVE_INFINITY)
}
