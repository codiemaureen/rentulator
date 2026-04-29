import styles from "./ResultsCard.module.css";
import { AnalyzerResults } from "./types";
import { currency, percent } from "./calculations";

type Props = {
  results: AnalyzerResults;
};

export default function ResultsCard({ results }: Props) {
  return (
    <aside className={styles.resultsCard}>
      <div className={styles.resultsHeader}>
        <p>Investment Snapshot</p>
        <h2>Results</h2>
      </div>

      <div className={styles.resultHero}>
        <p>Estimated Monthly Cash Flow</p>
        <strong>
          {currency(results.monthlyCashFlow)}
          <span>/mo</span>
        </strong>
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
  );
}