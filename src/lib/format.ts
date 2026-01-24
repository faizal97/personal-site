export function formatDate(
  date: Date,
  style: 'short' | 'long' = 'long',
): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
  });
}
