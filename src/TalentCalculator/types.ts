import { TalentIcon } from "./TalentItem/TalentItem";

export type Id = number;

export type TalentPath = {
  id: Id;
  name: string;
  talents: readonly Talent[];
};

export type Talent = {
  id: Id;
  name: string;
  icon: TalentIcon;
  active: boolean;
  prevTalentId?: Id;
  nextTalentId?: Id;
};
