import styles from "./Wordmark.module.css";

type WordmarkProps = {
  color?: "white" | "green";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Wordmark({
  color = "white",
  showTagline = true,
  size = "sm",
  className,
}: WordmarkProps) {
  return (
    <span
      className={`${styles.mark} ${styles[color]} ${styles[size]} ${className ?? ""}`}
    >
      <span className={styles.zorx} aria-hidden="true">
        ZORX
      </span>
      {showTagline ? (
        <span className={styles.tag}>Fueling Brands Growth</span>
      ) : null}
      <span className="sr-only">ZORX — Fueling Brands Growth</span>
    </span>
  );
}
