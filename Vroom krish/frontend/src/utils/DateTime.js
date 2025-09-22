// Function to extract and return the date portion from a datetime value
export function getDate(datetime) {
  const date = new Date(datetime);
  return date.toLocaleDateString();  // Returns formatted date like "MM/DD/YYYY"
}

// Function to extract and return the time portion from a datetime value
export function getTime(datetime) {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Format the time as HH:MM:SS
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}