export type Rating = "Looks strong" | "High risk" | "Pass with caution";

export type AnalyzerValues = {
  purchasePrice: number;
  downPaymentPct: number;
  interestRate: number;
  loanTermYears: number;
  nightlyRate: number;
  occupancyRate: number;
  otherMonthlyIncome: number;
  taxesMonthly: number;
  insuranceMonthly: number;
  utilitiesMonthly: number;
  cleaningMonthly: number;
  maintenanceMonthly: number;
  suppliesMonthly: number;
  platformFeePct: number;
  managementFeePct: number;
  vacancyBufferPct: number;
  closingCosts: number;
};

export type AnalyzerResults = {
  downPayment: number;
  loanAmount: number;
  mortgageMonthly: number;
  grossMonthlyRevenue: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  revenueToPriceRule: number;
  breakEvenOccupancy: number;
  rating: Rating;
};

export type UpdateAnalyzerValue = (
  key: keyof AnalyzerValues,
  value: number
) => void;

export type AnalyzerSectionProps = {
  values: AnalyzerValues;
  results: AnalyzerResults;
  updateValue: UpdateAnalyzerValue;
};