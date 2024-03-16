import { TalentPicker } from "./TalentPicker/TalentPicker";
import { TalentPointsCounter } from "./TalentPointsCounter/TalentPointsCounter";
import "./styles.css";
import { useTalentCalculatorState } from "./useTalentCalculatorState";

export function TalentCalculator() {
  const state = useTalentCalculatorState();
  const spentPoints = state.activeTalents.value.length ?? 0;
  const totalPoints = state.userPoints.value ?? 0;

  return (
    <main className="talent-calculator__wrapper">
      <h1 className="talent-calculator__title">
        TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
      </h1>
      <div className="talent-calculator__contents">
        <TalentPicker paths={state.talentPaths.value} />
        <TalentPointsCounter spent={spentPoints} total={totalPoints} />
      </div>
    </main>
  );
}
