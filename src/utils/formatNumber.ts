export const formatNumber = (number: string | number) => {
  const stringNumber = typeof number === 'string' ? number : number.toString();
  return stringNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
