export const checkIfExpiresSoon = (year) => {
  const currentYear = new Date().getFullYear();
  const cardYear = parseInt("20" + year);

  if (currentYear === cardYear) {
    return "- Expires soon!";
  } else return "";
};
