import { useEffect, useState } from "react";
import styles from "./AnalyzerInput.module.css";

type AnalyzerInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
};

export default function AnalyzerInput({
  label,
  value,
  onChange,
  suffix = "",
}: AnalyzerInputProps) {
  const [displayValue, setDisplayValue] = useState(String(value));

  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    setDisplayValue(nextValue);

    if (nextValue === "") return;

    const numericValue = Number(nextValue);

    if (!Number.isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const handleBlur = () => {
    if (displayValue === "") {
      setDisplayValue("0");
      onChange(0);
    }
  };

  return (
    <label className={styles.inputGroup}>
      <span className={styles.label}>{label}</span>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />

        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>
    </label>
  );
}