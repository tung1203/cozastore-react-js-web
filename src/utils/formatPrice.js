module.exports = {
  toVnd: (currency) => Number(parseInt(currency).toFixed(1)).toLocaleString() + " VND"
};
