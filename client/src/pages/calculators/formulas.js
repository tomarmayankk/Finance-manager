// -----------------------------
// EXISTING CALCULATORS
// -----------------------------

export const calculateSIP = (monthly, rate, years) => {
  const r = rate / 12 / 100;
  const n = years * 12;

  const total =
    monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

  const invested = monthly * n;
  const interest = total - invested;

  return {
    main: total,       // total value
    invested,          // invested amount
    interest           // returns
  };
};

export const calculateEMI = (loan, rate, years) => {
  const r = rate / 12 / 100;
  const n = years * 12;

  const emi =
    (loan * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  const total = emi * n;
  const interest = total - loan;

  return {
    main: emi,        // monthly EMI
    invested: loan,   // loan amount
    interest,         // total interest
    total             // total payable
  };
};

export const calculateFD = (principal, rate, years) => {
  const total =
    principal * Math.pow(1 + rate / 100, years);

  const interest = total - principal;

  return {
    main: total,        // maturity value
    invested: principal,
    interest
  };
};

export const calculateRD = (monthly, rate, years) => {
  const n = years * 12;
  const r = rate / 100 / 12;

  const total =
    monthly *
    ((Math.pow(1 + r, n) - 1) / r) *
    (1 + r);

  const invested = monthly * n;
  const interest = total - invested;

  return {
    main: total,
    invested,
    interest
  };
};

export const calculateLumpsum = (principal, rate, years) => {
  const total =
    principal * Math.pow(1 + rate / 100, years);

  const interest = total - principal;

  return {
    main: total,
    invested: principal,
    interest
  };
};



// -----------------------------
// NEW CALCULATORS
// -----------------------------

export const calculatePPF = (yearly, rate, years) => {
  let balance = 0;
  let invested = 0;

  for (let i = 0; i < years; i++) {
    balance = (balance + yearly) * (1 + rate / 100);
    invested += yearly;
  }

  const interest = balance - invested;

  return {
    main: balance,
    invested,
    interest
  };
};


export const calculateInflation = (amount, rate, years) => {
  const futureValue =
    amount / Math.pow(1 + rate / 100, years);

  const loss = amount - futureValue;

  return {
    main: futureValue,   // future purchasing value
    invested: amount,    // today's value
    interest: loss       // loss due to inflation
  };
};


export const calculateStepUpSIP = (
  monthly,
  rate,
  years,
  increase
) => {
  const r = rate / 12 / 100;

  let invested = 0;
  let total = 0;
  let current = monthly;

  for (let y = 1; y <= years; y++) {

    for (let m = 0; m < 12; m++) {
      total = (total + current) * (1 + r);
      invested += current;
    }

    current = current * (1 + increase / 100);
  }

  const interest = total - invested;

  return {
    main: total,
    invested,
    interest
  };
};