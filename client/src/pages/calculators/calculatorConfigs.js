import {
  calculateSIP,
  calculateEMI,
  calculateFD,
  calculateRD,
  calculateLumpsum,
  calculatePPF,
  calculateInflation,
  calculateStepUpSIP
} from "./formulas";

export const calculators = {

  sip: {
    title: "SIP Calculator",
    resultTitle: "Total Value",
    labels: {
      invested: "Invested Amount",
      interest: "Estimated Returns"
    },
    inputs: [
      { label: "Monthly Investment", key: "monthly", min: 500, max: 100000, default: 5000 },
      { label: "Expected Return (%)", key: "rate", min: 1, max: 20, default: 12 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 30, default: 10 }
    ],
    formula: calculateSIP
  },

  emi: {
    title: "EMI Calculator",
    resultTitle: "Monthly EMI",
    labels: {
      invested: "Loan Amount",
      interest: "Total Interest",
      total: "Total Payable Amount"
    },
    inputs: [
      { label: "Loan Amount", key: "loan", min: 10000, max: 5000000, default: 500000 },
      { label: "Interest Rate (%)", key: "rate", min: 1, max: 20, default: 8 },
      { label: "Loan Tenure (Years)", key: "years", min: 1, max: 30, default: 5 }
    ],
    formula: calculateEMI
  },

  fd: {
    title: "FD Calculator",
    resultTitle: "Maturity Value",
    labels: {
      invested: "Invested Amount",
      interest: "Interest Earned"
    },
    inputs: [
      { label: "Investment Amount", key: "principal", min: 10000, max: 10000000, default: 100000 },
      { label: "Interest Rate (%)", key: "rate", min: 1, max: 15, default: 7 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 20, default: 5 }
    ],
    formula: calculateFD
  },

  rd: {
    title: "RD Calculator",
    resultTitle: "Maturity Value",
    labels: {
      invested: "Total Investment",
      interest: "Interest Earned"
    },
    inputs: [
      { label: "Monthly Investment", key: "monthly", min: 500, max: 50000, default: 2000 },
      { label: "Interest Rate (%)", key: "rate", min: 1, max: 12, default: 6.5 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 20, default: 5 }
    ],
    formula: calculateRD
  },

  lumpsum: {
    title: "Lump Sum Calculator",
    resultTitle: "Future Value",
    labels: {
      invested: "Invested Amount",
      interest: "Estimated Returns"
    },
    inputs: [
      { label: "Investment Amount", key: "principal", min: 1000, max: 10000000, default: 50000 },
      { label: "Expected Return (%)", key: "rate", min: 1, max: 20, default: 12 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 30, default: 10 }
    ],
    formula: calculateLumpsum
  },

  ppf: {
    title: "PPF Calculator",
    resultTitle: "Maturity Value",
    labels: {
      invested: "Total Investment",
      interest: "Interest Earned"
    },
    inputs: [
      { label: "Yearly Investment", key: "yearly", min: 500, max: 150000, default: 50000 },
      { label: "Interest Rate (%)", key: "rate", min: 5, max: 10, default: 7.1 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 15, default: 15 }
    ],
    formula: calculatePPF
  },

  inflation: {
    title: "Inflation Calculator",
    resultTitle: "Future Value (Today's Worth)",
    labels: {
      invested: "Current Value",
      interest: "Loss Due To Inflation"
    },
    inputs: [
      { label: "Current Amount", key: "amount", min: 1000, max: 10000000, default: 100000 },
      { label: "Inflation Rate (%)", key: "rate", min: 1, max: 12, default: 6 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 40, default: 10 }
    ],
    formula: calculateInflation
  },

  stepupsip: {
    title: "Step-Up SIP Calculator",
    resultTitle: "Total Value",
    labels: {
      invested: "Total Investment",
      interest: "Estimated Returns"
    },
    inputs: [
      { label: "Monthly Investment", key: "monthly", min: 500, max: 100000, default: 5000 },
      { label: "Expected Return (%)", key: "rate", min: 1, max: 20, default: 12 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 30, default: 15 },
      { label: "Yearly Increase (%)", key: "increase", min: 1, max: 20, default: 10 }
    ],
    formula: calculateStepUpSIP
  }

};