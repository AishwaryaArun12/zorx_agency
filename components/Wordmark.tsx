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
  const fill = color === "green" ? "#147a33" : "#ffffff";

  return (
    <span className={`${styles.mark} ${styles[size]} ${className ?? ""}`}>
      <svg
        className={styles.logo}
        viewBox={showTagline ? "0 0 520 150" : "0 0 520 110"}
        role="img"
        aria-label={showTagline ? "ZORX — Fueling Brands Growth" : "ZORX"}
      >
        <g fill="none" stroke={fill} strokeLinecap="square">
          <path strokeWidth="14" d="M16 22h92L16 88h92" />
          <circle cx="186" cy="55" r="36" strokeWidth="14" />
          <path
            strokeWidth="14"
            d="M250 91V19h28c22 0 38 12 38 32 0 16-10 27-26 31l32 29"
          />
          <path strokeWidth="12" d="M372 22l80 70M452 22l-80 70" />
        </g>
        {showTagline ? (
          <text
            x="260"
            y="138"
            textAnchor="middle"
            fill={fill}
            fontSize="14"
            letterSpacing="8.2"
            fontFamily="Helvetica, Arial, sans-serif"
          >
            FUELING BRANDS GROWTH
          </text>
        ) : null}
      </svg>
    </span>
  );
}
