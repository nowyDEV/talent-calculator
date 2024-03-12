import { TalentPath as TalentPathType } from "../types";
import { TalentPath } from "../TalentPath/TalentPath";
import "./styles.css";

type Props = { paths: TalentPathType[] };

export function TalentPicker({ paths }: Props) {
  return (
    <ul className="talent-picker">
      {paths.map((path) => (
        <TalentPath key={path.id} name={path.name} talents={path.talents} />
      ))}
    </ul>
  );
}
