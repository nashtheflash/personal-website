export function capitalizeFirstLetter(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return word; // Handle non-string input or empty strings
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}
