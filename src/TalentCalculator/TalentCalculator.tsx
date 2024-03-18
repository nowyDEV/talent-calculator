import { TalentPicker } from "./TalentPicker/TalentPicker";
import { TalentPointsCounter } from "./TalentPointsCounter/TalentPointsCounter";
import "./styles.css";
import { useTalentCalculatorState } from "./useTalentCalculatorState";

export function TalentCalculator() {
  const { talentPaths, activeTalents, userPoints } = useTalentCalculatorState();
  const spentPoints = activeTalents.value.length;
  const totalPoints = userPoints.value;

  return (
    <div className="talent-calculator__wrapper">
      <h1 className="talent-calculator__title">
        TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
      </h1>
      <div className="talent-calculator__contents">
        <TalentPicker paths={talentPaths.value} />
        <TalentPointsCounter spent={spentPoints} total={totalPoints} />
      </div>
    </div>
  );
}
