import { TalentCalculator } from "./TalentCalculator/TalentCalculator";
import { TalentCalculatorStateProvider } from "./TalentCalculator/TalentCalculatorContext";
import { data } from "./data";

import "./App.css";

export function App() {
  return (
    <TalentCalculatorStateProvider
      initialState={{ initialUserPoints: data.userPoints }}
    >
      <TalentCalculator talentPaths={data.talentPaths} />
    </TalentCalculatorStateProvider>
  );
}
