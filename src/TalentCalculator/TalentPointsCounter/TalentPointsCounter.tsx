import "./styles.css";

type Props = {
  spent: number;
  total: number;
};

export function TalentPointsCounter({ spent, total }: Props) {
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
