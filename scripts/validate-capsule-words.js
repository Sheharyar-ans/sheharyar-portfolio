// Helper script to test word counts of draft capsules
export function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}
