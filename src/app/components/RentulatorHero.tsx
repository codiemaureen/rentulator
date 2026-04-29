import styles from "./RentulatorHero.module.css";

type Props = {
  rating: string;
};

export default function RentulatorHero({ rating }: Props) {
  const ratingClass =
    rating === "Looks strong"
      ? styles.strong
      : rating === "High risk"
      ? styles.risk
      : styles.caution;

  return (
    <header className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>Rentulator</p>

        <h1>
          Analyze before <span>you buy.</span>
        </h1>

        <p>
          Calculate cash flow, ROI, cap rate, mortgage costs, and expenses for
          your next short-term rental investment.
        </p>
      </div>

      <span className={`${styles.badge} ${ratingClass}`}>{rating}</span>
    </header>
  );
}