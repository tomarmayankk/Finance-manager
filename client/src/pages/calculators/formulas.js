export const calculateSIP = (monthly, rate, years) => {
  const r = rate / 12 / 100;
  const n = years * 12;

  const totalValue =
    monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

  const invested = monthly * n;
  const returns = totalValue - invested;

  return {
    main: totalValue,
    invested,
    returns
  };
};

export const calculateEMI = (loan, rate, years) => {
  const r = rate / 12 / 100;
  const n = years * 12;

  const emi =
    (loan * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  const totalPayment = emi * n;
  const interest = totalPayment - loan;

  return {
    main: emi,
    interest,
    totalPayment
  };
};

export const calculateFD = (principal, rate, years) => {
  const total = principal * Math.pow(1 + rate / 100, years);
  const interest = total - principal;

  return {
    main: total,
    invested: principal,
    returns: interest
  };
};

export const calculateRD = (monthly, rate, years) => {
  const n = years * 12;
  const r = rate / 100 / 12;

  const maturity =
    monthly *
    ((Math.pow(1 + r, n) - 1) / r) *
    (1 + r);

  const invested = monthly * n;
  const interest = maturity - invested;

  return {
    main: maturity,
    invested,
    interest
  };
};

export const calculateLumpsum = (principal, rate, years) => {
  const total = principal * Math.pow(1 + rate / 100, years);
  const returns = total - principal;

  return {
    main: total,
    invested: principal,
    returns
  };
};