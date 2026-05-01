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

<div
  className={`${styles.resultHero} ${
    results.monthlyCashFlow >= 0 ? styles.positiveHero : styles.negativeHero
  }`}
>
  <div className={styles.resultHeroTop}>
    <p>Estimated Monthly Cash Flow</p>

    <span
      className={`${styles.cashFlowStatus} ${
        results.monthlyCashFlow >= 0 ? styles.positiveStatus : styles.negativeStatus
      }`}
    >
      {results.monthlyCashFlow >= 0 ? "Positive" : "Negative"}
    </span>
  </div>

  <strong
    className={
      results.monthlyCashFlow >= 0 ? styles.positiveValue : styles.negativeValue
    }
  >
    {currency(results.monthlyCashFlow)}
    <span>/mo</span>
  </strong>

  <small>
    {results.monthlyCashFlow >= 0
      ? "This estimate shows positive monthly cash flow."
      : "This estimate shows the property may lose money monthly."}
  </small>
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