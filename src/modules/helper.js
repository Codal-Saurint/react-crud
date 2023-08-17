export function formattedDate(string) {
  return new Date(string).toLocaleDateString('en-US');
}

export function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


export const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';