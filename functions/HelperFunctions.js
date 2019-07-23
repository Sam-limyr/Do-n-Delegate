/*
Defines useful helper functions that can be imported and used as necessary
*/

function _pad(digit) {
  return (digit<10) ? '0' + digit : digit;
}

/*
input: js Date object
output: String of the form DD/MM/YYYY representing date.
*/
export function getDate(dateObject) {
  return [_pad(dateObject.getDate()), _pad(dateObject.getMonth()+1), dateObject.getFullYear()].join('/');
}

/*
input: js Date object
output: String of the form HH:MM representing time. 
*/
export function getTime(dateObject) {
  return [_pad(dateObject.getHours()),_pad(dateObject.getMinutes())].join(':');
}
