import { useTalentCalculatorStore } from "./store";
import { TalentPicker } from "./TalentPicker/TalentPicker";
import { TalentPointsCounter } from "./TalentPointsCounter/TalentPointsCounter";
import "./styles.css";
import { TalentPath } from "./types";
import { useEffect } from "preact/compat";

type Props = {
  userPoints: number;
  talentPaths: TalentPath[];
};

export function TalentCalculator({ userPoints, talentPaths }: Props) {
  const spentPoints = useTalentCalculatorStore((state) => state.talents.length);
  const totalPoints = useTalentCalculatorStore((state) => state.userPoints);
  const setUserPoints = useTalentCalculatorStore(
    (state) => state.setUserPoints
  );

  useEffect(() => {
    setUserPoints(userPoints);
  }, [userPoints, setUserPoints]);

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
