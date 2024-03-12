import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Talent } from "./types";
import { data } from "./data";

// define types for state values and actions separately
type State = {
  userPoints: number;
  talents: Talent[];
};

type Actions = {
  addTalent: (talent: Talent) => void;
  removeTalent: (talent: Talent) => void;
  reset: () => void;
};

// define the initial state
const initialState: State = {
  userPoints: data.userPoints,
  talents: [],
};

export const useTalentCalculatorStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      addTalent: (talent: Talent) =>
        set((state) => {
          if (
            state.talents.length === state.userPoints ||
            state.talents.some((activeTalent) => activeTalent.id === talent.id)
          ) {
            return {
              talents: state.talents,
            };
          }

          if (
            talent.prevTalentId == null ||
            state.talents.some(
              (activeTalent) => activeTalent.id === talent.prevTalentId
            )
          ) {
            return {
              talents: [...state.talents, talent],
            };
          }

          return {
            talents: state.talents,
          };
        }),
      removeTalent: (talent) =>
        set((state) => {
          if (
            state.talents.some(
              (activeTalent) => activeTalent.id === talent.nextTalentId
            )
          ) {
            return {
              talents: state.talents,
            };
          }

          return {
            talents: state.talents.filter(
              (activeTalent) => activeTalent.id !== talent.id
            ),
          };
        }),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "talent-calculator-storage",
      partialize: (state) => ({
        talents: state.talents,
        userPoints: state.userPoints,
      }),
    }
  )
);
