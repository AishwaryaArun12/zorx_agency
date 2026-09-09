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
        <image
          href={color === "green" ? "/brand/zorx-green.png" : "/brand/zorx-white.png"}
          x="0"
          y="0"
          width="220"
          height={showTagline ? "110" : "80"}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        />
        
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
