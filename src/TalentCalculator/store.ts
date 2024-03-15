import { signal, effect, Signal } from "@preact/signals";
import { Talent } from "./types";

const lsHandler = {
  LS_KEY: "talent-calculator-storage",
  get(): State | null {
    const lsData = window.localStorage.getItem(this.LS_KEY);
    return lsData ? JSON.parse(lsData) : null;
  },
  set(data: State) {
    window.localStorage.setItem(this.LS_KEY, JSON.stringify(data));
  },
};

export type State = {
  userPoints: number;
  talents: Talent[];
};

export type Actions = {
  addTalent: (talent: Talent) => void;
  removeTalent: (talent: Talent) => void;
  reset: () => void;
};

export type TalentCalculatorStore = Actions & {
  userPoints: Signal<State["userPoints"]>;
  talents: Signal<State["talents"]>;
};

/**
 * Might refactor it as per recommendation
 * @see https://preactjs.com/guide/v10/signals/#managing-global-app-state
 */
function createTalentCalculatorStore(): TalentCalculatorStore {
  const initialState: State = lsHandler.get() ?? { talents: [], userPoints: 0 };

  const talents = signal<Talent[]>(initialState.talents);
  const userPoints = signal(initialState.userPoints);

  effect(() => {
    lsHandler.set({ talents: talents.value, userPoints: userPoints.value });
  });

  const addTalent = (talent: Talent) => {
    if (
      talents.value.length === userPoints.value ||
      talents.value.some((activeTalent) => activeTalent.id === talent.id)
    ) {
      return;
    }

    if (
      talent.prevTalentId == null ||
      talents.value.some(
        (activeTalent) => activeTalent.id === talent.prevTalentId
      )
    ) {
      talents.value = [...talents.value, talent];
    }
  };

  const removeTalent = (talent: Talent) => {
    if (
      talents.value.some(
        (activeTalent) => activeTalent.id === talent.nextTalentId
      )
    ) {
      return;
    }

    talents.value = talents.value.filter(
      (activeTalent) => activeTalent.id !== talent.id
    );
  };

  const reset = () => {
    userPoints.value = initialState.userPoints;
    talents.value = initialState.talents;
  };

  return {
    talents,
    userPoints,
    reset,
    addTalent,
    removeTalent,
  };
}

let talentCalculatorStore:
  | ReturnType<typeof createTalentCalculatorStore>
  | undefined;

export function getTalentCalculatorStore() {
  if (talentCalculatorStore != null) {
    return talentCalculatorStore;
  }

  talentCalculatorStore = createTalentCalculatorStore();
  return talentCalculatorStore;
}
