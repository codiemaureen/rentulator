"use client";

import { useMemo, useState } from "react";
import styles from "./RentulatorAnalyzer.module.css";
import { AnalyzerValues } from "./types";
import { calculateAirbnbDeal } from "./calculations";
import RentulatorHero from "./RentulatorHero";
import AnalyzerForm from "./AnalyzerForm";
import ResultsCard from "./ResultsCard";
import MobileBottomResultsBar from "./MobileBottomResultsBar";
import InstallAppButton from "./InstallAppButton";

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

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.leftPanel}>
          <RentulatorHero rating={results.rating} />

          <AnalyzerForm
            values={values}
            results={results}
            updateValue={updateValue}
          />
        </div>

        <aside className={styles.desktopResults}>
          <ResultsCard results={results} />
        </aside>
      </section>

      <MobileBottomResultsBar results={results} />
    </main>
  );
}