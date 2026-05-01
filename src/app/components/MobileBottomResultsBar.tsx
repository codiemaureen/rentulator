import styles from "./MobileBottomResultsBar.module.css";
import { AnalyzerResults } from "./types";
import { currency } from "./calculations";

type Props = {
  results: AnalyzerResults;
};

export default function MobileBottomResultsBar({ results }: Props) {
  const isPositive = results.monthlyCashFlow >= 0;

  return (
    <div className={styles.bottomBar}>
      <div>
        <span>Monthly Cash Flow</span>
        <strong className={isPositive ? styles.positive : styles.negative}>
          {currency(results.monthlyCashFlow)}
          <small>/mo</small>
        </strong>
      </div>

      <a href="#results" className={styles.button}>
        View Results
      </a>
    </div>
  );
}