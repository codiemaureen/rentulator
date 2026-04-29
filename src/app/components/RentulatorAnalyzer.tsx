"use client";

import { useMemo, useState } from "react";
import AnalyzerInput from "./AnalyzerInput";
import styles from "./RentulatorAnalyzer.module.css";
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

export default function RentulatorAnalyzer() {
  const [values, setValues] = useState<AnalyzerValues>(initialValues);

  const results = useMemo(() => calculateAirbnbDeal(values), [values]);

  const updateValue = (key: keyof AnalyzerValues, value: number) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const ratingClass =
    results.rating === "Looks strong"
      ? styles.strong
      : results.rating === "High risk"
      ? styles.risk
      : styles.caution;

  return (
    <main className={styles.analyzerPage}>
      <div className={styles.brandHeader}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark} aria-hidden="true">
            ↗
          </div>

          <div>
            <h1 className={styles.brandName}>Rentulator</h1>
            <p className={styles.tagline}>Analyze before you buy.</p>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div>
            <p className={styles.eyebrow}>Short-Term Rental Analyzer</p>

            <h2 className={styles.heroTitle}>
              Run the numbers. <span>Build your future.</span>
            </h2>

            <p className={styles.heroText}>
              Instantly calculate cash flow, cap rate, returns, expenses, and
              mortgage estimates before committing to your next rental
              investment.
            </p>
          </div>

          <span className={`${styles.badge} ${ratingClass}`}>
            {results.rating}
          </span>
        </div>
      </div>

      <section className={styles.analyzerGrid}>
        <div className={styles.formColumn}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Step 01</p>
              <h2>Purchase & Financing</h2>
            </div>

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
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Step 02</p>
              <h2>Revenue</h2>
            </div>

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
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Step 03</p>
              <h2>Expenses</h2>
            </div>

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
        </div>

        <aside className={styles.resultsCard}>
          <div className={styles.resultsHeader}>
            <p className={styles.sectionEyebrow}>Investment Snapshot</p>
            <h2>Results</h2>
          </div>

          <div className={styles.resultHero}>
            <p className={styles.resultLabel}>Estimated Monthly Cash Flow</p>
            <p className={styles.resultValue}>
              {currency(results.monthlyCashFlow)}
              <span>/mo</span>
            </p>
          </div>

          <div className={styles.metricGrid}>
            <div className={styles.metric}>
              <span>Monthly Revenue</span>
              <strong>{currency(results.grossMonthlyRevenue)}</strong>
            </div>

            <div className={styles.metric}>
              <span>Monthly Expenses</span>
              <strong>{currency(results.totalMonthlyExpenses)}</strong>
            </div>

            <div className={styles.metric}>
              <span>Annual Cash Flow</span>
              <strong>{currency(results.annualCashFlow)}</strong>
            </div>

            <div className={styles.metric}>
              <span>Cash-on-Cash Return</span>
              <strong className={styles.gold}>
                {percent(results.cashOnCashReturn)}
              </strong>
            </div>

            <div className={styles.metric}>
              <span>Break-even Occupancy</span>
              <strong>{percent(results.breakEvenOccupancy)}</strong>
            </div>

            <div className={styles.metric}>
              <span>Estimated Mortgage</span>
              <strong>{currency(results.mortgageMonthly)}</strong>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}