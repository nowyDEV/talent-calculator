import { TalentCalculator } from "./TalentCalculator/TalentCalculator";
import { data } from "./data";

import "./App.css";

export function App() {
  return (
    <TalentCalculator
      talentPaths={data.talentPaths}
      userPoints={data.userPoints}
    />
  );
}
