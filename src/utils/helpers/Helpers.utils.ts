export const capitalizeFirstLetter = (word: string): string => {  
  return word.charAt(0).toUpperCase();
};

export const capitalizeEachWord = (sentence: string): string => {
  return sentence
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};