import { createContext, ComponentChild } from "preact";
import {
  getTalentCalculatorStore,
  TalentCalculatorStore,
  State,
} from "./store";
import { useEffect } from "preact/hooks";

export const TalentCalculatorState = createContext<
  TalentCalculatorStore | undefined
>(undefined);

export function TalentCalculatorStateProvider({
  initialState,
  children,
}: {
  initialState: Partial<State>;
  children: ComponentChild;
}) {
  const store = getTalentCalculatorStore();

  useEffect(() => {
    if (initialState.userPoints != null) {
      store.userPoints.value = initialState.userPoints;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dependency is not needed in this case
  }, [initialState.userPoints]);

  useEffect(() => {
    if (initialState.talents != null) {
      store.talents.value = initialState.talents;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dependency is not needed in this case
  }, [initialState.talents]);

  return (
    <TalentCalculatorState.Provider value={store}>
      {children}
    </TalentCalculatorState.Provider>
  );
}
