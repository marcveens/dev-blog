export function cutStringToWholeWord(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }

  // Trim the string to the maximum length
  var trimmedString = str.substring(0, maxLength);

  // Re-trim the string to the last whole word
  trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));

  if (trimmedString.length < str.length) {
    trimmedString += '...';
  }

  return trimmedString;
}
