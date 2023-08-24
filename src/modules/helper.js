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

export function get_random_status(list) {
  return list[Math.floor(Math.random() * list.length)];
}
export function getRandomUserfromArray(tempUsers) {
  return tempUsers[Math.floor(Math.random() * tempUsers.length)];
}

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}

export function removeHyphen(dummyString) {
  return dummyString.replace(/-/g, '');
}

export function removeSpaceChangeCase(string) {
  return string.replace(/\./g, '').toLowerCase().replace(/_/g, '');
}