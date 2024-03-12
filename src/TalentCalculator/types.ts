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
  prevTalentId?: Id;
  nextTalentId?: Id;
};
