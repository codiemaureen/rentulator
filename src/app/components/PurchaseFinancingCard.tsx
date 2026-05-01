import AnalyzerInput from "./AnalyzerInput";
import styles from "./PurchaseFinancingCard.module.css";
import { AnalyzerValues, AnalyzerResults } from "./types";
import { currency } from "./calculations";

type Props = {
  values: AnalyzerValues;
  results: AnalyzerResults;
  updateValue: (key: keyof AnalyzerValues, value: number) => void;
};

export default function PurchaseFinancingCard({
  values,
  results,
  updateValue,
}: Props) {
  return (
    <section className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <p>Step 01</p>
        <h2>Purchase & Financing</h2>
      </div>

      <div className={styles.inputGrid}>
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
      </div>

      <div className={styles.formSummary}>
        <span>Estimated monthly mortgage</span>
        <strong>{currency(results.mortgageMonthly)}</strong>
      </div>
    </section>
  );
}