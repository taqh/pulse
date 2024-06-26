export default function shorten(sentence: string, maxLength: number) {
  if (sentence.length > maxLength) {
    return sentence.slice(0, maxLength) + '...';
  } else {
    return sentence;
  }
}
