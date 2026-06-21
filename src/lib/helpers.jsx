//capitalize first character
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// truncate text

export const truncate = (str, length) =>
  str.length > length ? str.slice(0, length) + "..." : str;
