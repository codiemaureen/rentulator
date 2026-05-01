"use client";

import { useState } from "react";
import styles from "./AnalyzerForm.module.css";
import { AnalyzerValues, AnalyzerResults } from "./types";
import PurchaseFinancingCard from "./PurchaseFinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";
import ResultsCard from "./ResultsCard";

type Props = {
  values: AnalyzerValues;
  results: AnalyzerResults;
  updateValue: (key: keyof AnalyzerValues, value: number) => void;
};

const steps = ["Purchase", "Revenue", "Expenses", "Results"];

export default function AnalyzerForm({ values, results, updateValue }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const goBack = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  const goNext = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

return (
  <section className={styles.formShell}>
    <div className={styles.stepHeader}>
      <div>
        <p className={styles.eyebrow}>
          Step {currentStep + 1} of {steps.length}
        </p>
        <h2>{steps[currentStep]}</h2>
      </div>

      <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
    </div>

    <div className={styles.progressTrack}>
      <div
        className={styles.progressFill}
        style={{
          width: `${((currentStep + 1) / steps.length) * 100}%`,
        }}
      />
    </div>

    <div className={styles.mobileStepContent}>
      {currentStep === 0 && (
        <PurchaseFinancingCard
          values={values}
          results={results}
          updateValue={updateValue}
        />
      )}

      {currentStep === 1 && (
        <RevenueCard values={values} updateValue={updateValue} />
      )}

      {currentStep === 2 && (
        <ExpensesCard values={values} updateValue={updateValue} />
      )}

      {currentStep === 3 && <ResultsCard results={results} />}
    </div>

    <div className={styles.desktopFormContent}>
      <PurchaseFinancingCard
        values={values}
        results={results}
        updateValue={updateValue}
      />

      <RevenueCard values={values} updateValue={updateValue} />

      <ExpensesCard values={values} updateValue={updateValue} />
    </div>

    <div className={styles.stepActions}>
      <button
        type="button"
        onClick={goBack}
        className={styles.secondaryButton}
        disabled={isFirstStep}
      >
        Back
      </button>

      {!isLastStep ? (
        <button type="button" onClick={goNext} className={styles.primaryButton}>
          Continue
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setCurrentStep(0)}
          className={styles.primaryButton}
        >
          Edit Deal
        </button>
      )}
    </div>
  </section>
);
}