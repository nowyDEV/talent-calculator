import "./styles.css";

export function TalentPointsCounter({
  spent,
  total,
}: {
  spent: number;
  total: number;
}) {
  return (
    <div className="points-counter__wrapper">
      <p className="points-counter__inner">
        <span className="points-counter__value">
          {spent} / {total}
        </span>
        <span className="points-counter__description">Points spent</span>
      </p>
    </div>
  );
}
