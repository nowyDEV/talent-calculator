import { data } from "./data";
import { useTalentCalculatorStore } from "./store";
import { TalentPicker } from "./TalentPicker/TalentPicker";
import { TalentPointsCounter } from "./TalentPointsCounter/TalentPointsCounter";
import "./styles.css";

export function TalentCalculator() {
  const spentPoints = useTalentCalculatorStore((state) => state.talents.length);
  const totalPoints = useTalentCalculatorStore((state) => state.userPoints);

  return (
    <main className="talent-calculator__wrapper">
      <h1 className="talent-calculator__title">
        TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
      </h1>
      <div className="talent-calculator__contents">
        <TalentPicker paths={data.talentPaths} />
        <TalentPointsCounter spent={spentPoints} total={totalPoints} />
      </div>
    </main>
  );
}
