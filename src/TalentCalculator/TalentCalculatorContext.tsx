import { createContext, ComponentChild } from "preact";
import {
  getTalentCalculatorStore,
  TalentCalculatorStore,
  StoreParams,
} from "./store";

export const TalentCalculatorState = createContext<
  TalentCalculatorStore | undefined
>(undefined);

export function TalentCalculatorStateProvider({
  initialState,
  children,
}: {
  initialState: StoreParams;
  children: ComponentChild;
}) {
  const store = getTalentCalculatorStore(initialState);

  return (
    <TalentCalculatorState.Provider value={store}>
      {children}
    </TalentCalculatorState.Provider>
  );
}
