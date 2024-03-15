import { TalentPicker } from "./TalentPicker/TalentPicker";
import { TalentPointsCounter } from "./TalentPointsCounter/TalentPointsCounter";
import "./styles.css";
import { TalentPath } from "./types";
import { useTalentCalculatorState } from "./useTalentCalculatorState";

type Props = {
  talentPaths: TalentPath[];
};

export function TalentCalculator({ talentPaths }: Props) {
  const state = useTalentCalculatorState();
  const spentPoints = state.talents.value.length ?? 0;
  const totalPoints = state.userPoints.value ?? 0;

  return (
    <main className="talent-calculator__wrapper">
      <h1 className="talent-calculator__title">
        TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
      </h1>
      <div className="talent-calculator__contents">
        <TalentPicker paths={talentPaths} />
        <TalentPointsCounter spent={spentPoints} total={totalPoints} />
      </div>
    </main>
  );
}
