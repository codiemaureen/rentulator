import { AnalyzerResults, AnalyzerValues, Rating } from "./types";

export function calculateAirbnbDeal(values: AnalyzerValues): AnalyzerResults {
  const downPayment = values.purchasePrice * (values.downPaymentPct / 100);
  const loanAmount = Math.max(values.purchasePrice - downPayment, 0);
  const monthlyRate = values.interestRate / 100 / 12;
  const numberOfPayments = values.loanTermYears * 12;

  let mortgageMonthly = 0;

  if (loanAmount > 0 && numberOfPayments > 0) {
    mortgageMonthly =
      monthlyRate === 0
        ? loanAmount / numberOfPayments
        : (loanAmount * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  }

  const grossMonthlyRevenue =
    values.nightlyRate * (values.occupancyRate / 100) * 30 +
    values.otherMonthlyIncome;

  const platformFees = grossMonthlyRevenue * (values.platformFeePct / 100);
  const managementFees = grossMonthlyRevenue * (values.managementFeePct / 100);
  const vacancyBuffer = grossMonthlyRevenue * (values.vacancyBufferPct / 100);

  const totalMonthlyExpenses =
    mortgageMonthly +
    values.taxesMonthly +
    values.insuranceMonthly +
    values.utilitiesMonthly +
    values.cleaningMonthly +
    values.maintenanceMonthly +
    values.suppliesMonthly +
    platformFees +
    managementFees +
    vacancyBuffer;

  const monthlyCashFlow = grossMonthlyRevenue - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashInvested = downPayment + values.closingCosts;

  const cashOnCashReturn =
    cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;

  const revenueToPriceRule =
    values.purchasePrice > 0
      ? (grossMonthlyRevenue / values.purchasePrice) * 100
      : 0;

  const breakEvenOccupancy =
    values.nightlyRate > 0
      ? (totalMonthlyExpenses / (values.nightlyRate * 30)) * 100
      : 0;

  let rating: Rating = "Pass with caution";

  if (
    monthlyCashFlow >= 500 &&
    cashOnCashReturn >= 8 &&
    breakEvenOccupancy <= 65
  ) {
    rating = "Looks strong";
  } else if (monthlyCashFlow < 0 || breakEvenOccupancy > 75) {
    rating = "High risk";
  }

  return {
    downPayment,
    loanAmount,
    mortgageMonthly,
    grossMonthlyRevenue,
    totalMonthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturn,
    revenueToPriceRule,
    breakEvenOccupancy,
    rating,
  };
}

export function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function percent(value: number): string {
  return `${Number.isFinite(value) ? value.toFixed(1) : 0}%`;
}