/** Explicit dimensions keep temporary artwork in the final asset's proportions. */
export function placeholder(width: number, height: number, label: string): string {
  return `https://placehold.co/${width}x${height}/e8e8e8/555555/png?text=${encodeURIComponent(label)}`;
}
