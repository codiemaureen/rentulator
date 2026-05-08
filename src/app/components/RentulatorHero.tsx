import Image from "next/image";
import styles from "./RentulatorHero.module.css";
import InstallAppButton from "./InstallAppButton";

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

        <div className={styles.brand}>
          <Image
            src="/logo.png"
            alt="Rentulator logo"
            width={180}
            height={180}
            className={styles.logo}
          />

          <p className={styles.eyebrow}>RENTULATOR</p>
        </div>
        <h1>
          Analyze before <span>you buy.</span>
        </h1>

        <p>
          Calculate cash flow, ROI, cap rate, mortgage costs, and expenses for
          your next short-term rental investment.
        </p>
      <InstallAppButton />
      </div>

      <span className={`${styles.badge} ${ratingClass}`}>{rating}</span>
    </header>
  );
}