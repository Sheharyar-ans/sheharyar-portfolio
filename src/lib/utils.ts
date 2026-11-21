export function cn(...inputs: Array<string | undefined | null | false | Record<string, boolean>>): string {
  const classes: string[] = [];
  for (const item of inputs) {
    if (!item) continue;
    if (typeof item === 'string') {
      classes.push(item);
    } else if (typeof item === 'object') {
      for (const [key, val] of Object.entries(item)) {
        if (val) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}
