/**
 * Example of data that is already mapped and ready to be used for UI
 */
export const data = {
  userPoints: 6,
  talentPaths: [
    {
      id: 0,
      name: "Talent Path 1",
      talents: [
        {
          id: 0,
          name: "Will",
          icon: "chevrons",
          nextTalentId: 1,
        },
        {
          id: 1,
          name: "Eat",
          icon: "silverware",
          prevTalentId: 0,
          nextTalentId: 2,
        },
        {
          id: 2,
          name: "Food",
          icon: "cake",
          prevTalentId: 1,
          nextTalentId: 3,
        },
        {
          id: 3,
          name: "King",
          icon: "crown",
          prevTalentId: 2,
        },
      ] as const,
    },
    {
      id: 1,
      name: "Talent Path 2",
      talents: [
        {
          id: 4,
          name: "Swim",
          icon: "ship",
          nextTalentId: 5,
        },
        {
          id: 5,
          name: "Dive",
          icon: "diver",
          prevTalentId: 4,
          nextTalentId: 6,
        },
        {
          id: 6,
          name: "Speed",
          icon: "lightning",
          prevTalentId: 5,
          nextTalentId: 7,
        },
        {
          id: 7,
          name: "Deadly",
          icon: "skull",
          prevTalentId: 6,
        },
      ] as const,
    },
  ],
};
