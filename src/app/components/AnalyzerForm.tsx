import styles from "./AnalyzerForm.module.css";
import { AnalyzerValues, AnalyzerResults } from "./types";
import PurchaseFinancingCard from "./PurchaseFinancingCard";
import RevenueCard from "./RevenueCard";
import ExpensesCard from "./ExpensesCard";

type Props = {
  values: AnalyzerValues;
  results: AnalyzerResults;
  updateValue: (key: keyof AnalyzerValues, value: number) => void;
};

export default function AnalyzerForm({ values, results, updateValue }: Props) {
  return (
    <div className={styles.formCard}>
      <PurchaseFinancingCard
        values={values}
        results={results}
        updateValue={updateValue}
      />

      <RevenueCard values={values} updateValue={updateValue} />

      <ExpensesCard values={values} updateValue={updateValue} />
    </div>
  );
}