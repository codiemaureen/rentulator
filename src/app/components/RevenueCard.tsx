import AnalyzerInput from "./AnalyzerInput";
import styles from "./AnalyzerSection.module.css";
import { AnalyzerValues } from "./types";

type Props = {
  values: AnalyzerValues;
  updateValue: (key: keyof AnalyzerValues, value: number) => void;
};

export default function RevenueCard({ values, updateValue }: Props) {
  return (
    <section className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <p>Step 02</p>
        <h2>Revenue</h2>
      </div>

      <div className={styles.inputGrid}>
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
    </section>
  );
}