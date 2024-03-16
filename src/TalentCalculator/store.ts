import { signal, effect, Signal, computed } from "@preact/signals";
import { Talent, TalentPath } from "./types";

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
  talentPaths: TalentPath[];
};

export type Actions = {
  activateTalent: (talent: Talent) => void;
  deactivateTalent: (talent: Talent) => void;
  reset: () => void;
};

export type TalentCalculatorStore = Actions & {
  userPoints: Signal<State["userPoints"]>;
  talentPaths: Signal<State["talentPaths"]>;
  activeTalents: Signal<Talent[]>;
};

export type StoreParams = {
  initialTalentPaths?: State["talentPaths"];
  initialUserPoints?: State["userPoints"];
};

export const defaultState = { talentPaths: [], userPoints: 0 };

/**
 * Might refactor it as per recommendation
 * @see https://preactjs.com/guide/v10/signals/#managing-global-app-state
 */
function createTalentCalculatorStore({
  initialTalentPaths = defaultState.talentPaths,
  initialUserPoints = defaultState.userPoints,
}: StoreParams = {}): TalentCalculatorStore {
  const initialState = {
    talentPaths: lsHandler.get()?.talentPaths ?? initialTalentPaths,
    userPoints: lsHandler.get()?.userPoints ?? initialUserPoints,
  };

  const talentPaths = signal<TalentPath[]>(initialState.talentPaths);
  const userPoints = signal(initialState.userPoints);

  const activeTalents = computed(() => {
    const talents = talentPaths.value.flatMap((path) => path.talents);
    return talents.filter((talent) => talent.active);
  });

  effect(() => {
    lsHandler.set({
      talentPaths: talentPaths.value,
      userPoints: userPoints.value,
    });
  });

  const activateTalent = (talent: Talent) => {
    if (
      activeTalents.value.length === userPoints.value ||
      activeTalents.value.some((activeTalent) => activeTalent.id === talent.id)
    ) {
      return;
    }

    if (
      talent.prevTalentId == null ||
      activeTalents.value.some(
        (activeTalent) => activeTalent.id === talent.prevTalentId
      )
    ) {
      talentPaths.value = talentPaths.value.map((path) => ({
        ...path,
        talents: path.talents.map((pathTalent) =>
          pathTalent.id === talent.id
            ? { ...pathTalent, active: true }
            : pathTalent
        ),
      }));
    }
  };

  const deactivateTalent = (talent: Talent) => {
    if (
      activeTalents.value.some(
        (activeTalent) => activeTalent.id === talent.nextTalentId
      )
    ) {
      return;
    }

    talentPaths.value = talentPaths.value.map((path) => ({
      ...path,
      talents: path.talents.map((pathTalent) =>
        pathTalent.id === talent.id
          ? { ...pathTalent, active: false }
          : pathTalent
      ),
    }));
  };

  const reset = () => {
    userPoints.value = initialState.userPoints;
    talentPaths.value = initialState.talentPaths;
  };

  return {
    talentPaths,
    activeTalents,
    userPoints,
    reset,
    activateTalent,
    deactivateTalent,
  };
}

let talentCalculatorStore:
  | ReturnType<typeof createTalentCalculatorStore>
  | undefined;

// Useful for testing to get the same instance of store that is used by components
export function getTalentCalculatorStore(
  ...params: Parameters<typeof createTalentCalculatorStore>
) {
  if (talentCalculatorStore != null) {
    return talentCalculatorStore;
  }

  talentCalculatorStore = createTalentCalculatorStore(...params);
  return talentCalculatorStore;
}
