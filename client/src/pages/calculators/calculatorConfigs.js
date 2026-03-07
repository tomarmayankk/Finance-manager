import {
  calculateSIP,
  calculateEMI,
  calculateFD,
  calculateRD,
  calculateLumpsum
} from "./formulas";

export const calculators = {

  sip: {
    title: "SIP Calculator",
    inputs: [
      { label: "Monthly Investment", key: "monthly", min: 500, max: 100000, default: 5000 },
      { label: "Expected Return (%)", key: "rate", min: 1, max: 20, default: 12 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 30, default: 10 }
    ],
    formula: calculateSIP
  },

  emi: {
    title: "EMI Calculator",
    inputs: [
      { label: "Loan Amount", key: "loan", min: 10000, max: 5000000, default: 500000 },
      { label: "Interest Rate (%)", key: "rate", min: 1, max: 20, default: 8 },
      { label: "Loan Tenure (Years)", key: "years", min: 1, max: 30, default: 5 }
    ],
    formula: calculateEMI
  },

  fd: {
    title: "FD Calculator",
    inputs: [
      { label: "Investment Amount", key: "principal", min: 10000, max: 10000000, default: 100000 },
      { label: "Interest Rate (%)", key: "rate", min: 1, max: 15, default: 7 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 20, default: 5 }
    ],
    formula: calculateFD
  },

  rd: {
    title: "RD Calculator",
    inputs: [
      { label: "Monthly Investment", key: "monthly", min: 500, max: 50000, default: 2000 },
      { label: "Interest Rate (%)", key: "rate", min: 1, max: 12, default: 6.5 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 20, default: 5 }
    ],
    formula: calculateRD
  },

  lumpsum: {
    title: "Lump Sum Calculator",
    inputs: [
      { label: "Investment Amount", key: "principal", min: 1000, max: 10000000, default: 50000 },
      { label: "Expected Return (%)", key: "rate", min: 1, max: 20, default: 12 },
      { label: "Time Period (Years)", key: "years", min: 1, max: 30, default: 10 }
    ],
    formula: calculateLumpsum
  }
};