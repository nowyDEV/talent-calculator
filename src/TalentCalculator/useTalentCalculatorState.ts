import { useContext } from "preact/hooks";
import { TalentCalculatorState } from "./TalentCalculatorContext";

export function useTalentCalculatorState() {
  const context = useContext(TalentCalculatorState);

  if (context === undefined) {
    throw new Error(
      "useTalentCalculatorState must be used within a TalentCalculatorState.Provider"
    );
  }

  return context;
}
