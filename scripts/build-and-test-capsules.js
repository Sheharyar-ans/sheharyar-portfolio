// Script to test data draft for exact word counts
import fs from 'node:fs';

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('Testing word count utility...');
console.log('Sample count:', countWords('This is a test of five words'));
