"use client";

import { useMemo, useState } from "react";
import AnalyzerInput from "./AnalyzerInput";
import styles from "./AirbnbDealAnalyzer.module.css";
import { AnalyzerValues } from "./types";
import { calculateAirbnbDeal, currency, percent } from "./calculations";

const initialValues: AnalyzerValues = {
  purchasePrice: 250000,
  downPaymentPct: 20,
  interestRate: 7,
  loanTermYears: 30,
  nightlyRate: 165,
  occupancyRate: 65,
  otherMonthlyIncome: 0,
  taxesMonthly: 275,
  insuranceMonthly: 125,
  utilitiesMonthly: 325,
  cleaningMonthly: 500,
  maintenanceMonthly: 200,
  suppliesMonthly: 100,
  platformFeePct: 3,
  managementFeePct: 0,
  vacancyBufferPct: 5,
  closingCosts: 4500,
};

export default function AirbnbDealAnalyzer() {
  const [values, setValues] = useState<AnalyzerValues>(initialValues);

  const results = useMemo(() => calculateAirbnbDeal(values), [values]);

  const updateValue = (key: keyof AnalyzerValues, value: number) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Short-Term Rental Analyzer</p>
          <h1>Airbnb Deal Analyzer</h1>
          <p className={styles.subtext}>
            Quickly test whether a property could cash flow as a short-term
            rental.
          </p>
        </div>

        <span
          className={`${styles.badge} ${
            results.rating === "Looks strong"
              ? styles.strong
              : results.rating === "High risk"
              ? styles.risk
              : styles.caution
          }`}
        >
          {results.rating}
        </span>
      </div>

      <section className={styles.grid}>
        <div className={styles.section}>
          <h2>Purchase & Financing</h2>

          <AnalyzerInput
            label="Purchase price"
            value={values.purchasePrice}
            onChange={(value) => updateValue("purchasePrice", value)}
          />

          <div>
            <AnalyzerInput
              label="Down payment"
              value={values.downPaymentPct}
              onChange={(value) => updateValue("downPaymentPct", value)}
              suffix="%"
            />

            <span className={styles.helperText}>
              Estimated down payment: {currency(results.downPayment)}
            </span>
          </div>

          <AnalyzerInput
            label="Interest rate"
            value={values.interestRate}
            onChange={(value) => updateValue("interestRate", value)}
            suffix="%"
          />

          <AnalyzerInput
            label="Loan term"
            value={values.loanTermYears}
            onChange={(value) => updateValue("loanTermYears", value)}
            suffix="years"
          />

          <AnalyzerInput
            label="Closing costs"
            value={values.closingCosts}
            onChange={(value) => updateValue("closingCosts", value)}
          />
          <div className={styles.formSummary}>
            <span>Estimated monthly mortgage</span>
            <strong>{currency(results.mortgageMonthly)}</strong>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Revenue</h2>

          <AnalyzerInput
            label="Nightly rate"
            value={values.nightlyRate}
            onChange={(value) => updateValue("nightlyRate", value)}
          />

          <AnalyzerInput
            label="Occupancy rate"
            value={values.occupancyRate}
            onChange={(value) => updateValue("occupancyRate", value)}
            suffix="%"
          />

          <AnalyzerInput
            label="Other monthly income"
            value={values.otherMonthlyIncome}
            onChange={(value) => updateValue("otherMonthlyIncome", value)}
          />
        </div>

        <div className={styles.section}>
          <h2>Expenses</h2>

          <AnalyzerInput
            label="Taxes monthly"
            value={values.taxesMonthly}
            onChange={(value) => updateValue("taxesMonthly", value)}
          />

          <AnalyzerInput
            label="Insurance monthly"
            value={values.insuranceMonthly}
            onChange={(value) => updateValue("insuranceMonthly", value)}
          />

          <AnalyzerInput
            label="Utilities monthly"
            value={values.utilitiesMonthly}
            onChange={(value) => updateValue("utilitiesMonthly", value)}
          />

          <AnalyzerInput
            label="Cleaning monthly"
            value={values.cleaningMonthly}
            onChange={(value) => updateValue("cleaningMonthly", value)}
          />

          <AnalyzerInput
            label="Maintenance reserve"
            value={values.maintenanceMonthly}
            onChange={(value) => updateValue("maintenanceMonthly", value)}
          />

          <AnalyzerInput
            label="Supplies monthly"
            value={values.suppliesMonthly}
            onChange={(value) => updateValue("suppliesMonthly", value)}
          />

          <AnalyzerInput
            label="Platform fee"
            value={values.platformFeePct}
            onChange={(value) => updateValue("platformFeePct", value)}
            suffix="%"
          />

          <AnalyzerInput
            label="Management fee"
            value={values.managementFeePct}
            onChange={(value) => updateValue("managementFeePct", value)}
            suffix="%"
          />

          <AnalyzerInput
            label="Vacancy buffer"
            value={values.vacancyBufferPct}
            onChange={(value) => updateValue("vacancyBufferPct", value)}
            suffix="%"
          />
        </div>

        <div className={styles.resultsCard}>
          <h2>Results</h2>

          <div className={styles.resultRow}>
            <span>Monthly revenue</span>
            <strong>{currency(results.grossMonthlyRevenue)}</strong>
          </div>

          <div className={styles.resultRow}>
            <span>Monthly expenses</span>
            <strong>{currency(results.totalMonthlyExpenses)}</strong>
          </div>

          <div className={styles.resultRow}>
            <span>Monthly cash flow</span>
            <strong>{currency(results.monthlyCashFlow)}</strong>
          </div>

          <div className={styles.resultRow}>
            <span>Annual cash flow</span>
            <strong>{currency(results.annualCashFlow)}</strong>
          </div>

          <div className={styles.resultRow}>
            <span>Cash-on-cash return</span>
            <strong>{percent(results.cashOnCashReturn)}</strong>
          </div>

          <div className={styles.resultRow}>
            <span>Break-even occupancy</span>
            <strong>{percent(results.breakEvenOccupancy)}</strong>
          </div>

          <div className={styles.resultRow}>
            <span>Estimated mortgage</span>
            <strong>{currency(results.mortgageMonthly)}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}