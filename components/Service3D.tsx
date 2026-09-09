type Service3DProps = {
  index: string;
  title: string;
  copy: string;
  className: string;
  numClassName: string;
};

export function Service3D({ index, title, copy, className, numClassName }: Service3DProps) {
  return (
    <li data-card className={className}>
      <span className={numClassName}>{index}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </li>
  );
}
