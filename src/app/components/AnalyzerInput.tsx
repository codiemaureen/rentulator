import styles from "./AnalyzerInput.module.css";

type Props = {
  label: string;
  value: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export default function AnalyzerInput({
  label,
  value,
  suffix,
  onChange,
}: Props) {
  return (
    <label className={styles.field}>
      <span>{label}</span>

      <div className={styles.inputWrap}>
        <input
          className={`${styles.input} ${suffix ? styles.hasSuffix : ""}`}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          inputMode="decimal"
        />

        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    </label>
  );
}