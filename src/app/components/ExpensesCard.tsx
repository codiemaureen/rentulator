import AnalyzerInput from "./AnalyzerInput";
import styles from "./ExpensesCard.module.css";
import { AnalyzerValues } from "./types";

type Props = {
  values: AnalyzerValues;
  updateValue: (key: keyof AnalyzerValues, value: number) => void;
};

export default function ExpensesCard({ values, updateValue }: Props) {
  return (
    <section className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <p>Step 03</p>
        <h2>Expenses</h2>
      </div>

      <div className={styles.inputGrid}>
        <AnalyzerInput label="Taxes monthly" value={values.taxesMonthly} onChange={(value) => updateValue("taxesMonthly", value)} />
        <AnalyzerInput label="Insurance monthly" value={values.insuranceMonthly} onChange={(value) => updateValue("insuranceMonthly", value)} />
        <AnalyzerInput label="Utilities monthly" value={values.utilitiesMonthly} onChange={(value) => updateValue("utilitiesMonthly", value)} />
        <AnalyzerInput label="Cleaning monthly" value={values.cleaningMonthly} onChange={(value) => updateValue("cleaningMonthly", value)} />
        <AnalyzerInput label="Maintenance reserve" value={values.maintenanceMonthly} onChange={(value) => updateValue("maintenanceMonthly", value)} />
        <AnalyzerInput label="Supplies monthly" value={values.suppliesMonthly} onChange={(value) => updateValue("suppliesMonthly", value)} />
        <AnalyzerInput label="Platform fee" value={values.platformFeePct} onChange={(value) => updateValue("platformFeePct", value)} suffix="%" />
        <AnalyzerInput label="Management fee" value={values.managementFeePct} onChange={(value) => updateValue("managementFeePct", value)} suffix="%" />
        <AnalyzerInput label="Vacancy buffer" value={values.vacancyBufferPct} onChange={(value) => updateValue("vacancyBufferPct", value)} suffix="%" />
      </div>
    </section>
  );
}