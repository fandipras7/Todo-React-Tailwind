export function formatPriority(priority: string, uppercase: boolean): string {
  let formattedWords;
  let words;
  words = priority.split(" ")
  formattedWords = words.map((word)=> word.charAt(0).toLowerCase() + word.slice(1)).join("-");
  if(uppercase) {
    words = priority.split("-");
    formattedWords = words.map( (word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  
  return formattedWords
}
