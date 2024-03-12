import { JSX } from "preact/jsx-dev-runtime";
import "./styles.css";

export type TalentIcon =
  | "ship"
  | "diver"
  | "lightning"
  | "skull"
  | "chevrons"
  | "silverware"
  | "cake"
  | "crown";

type Props = JSX.IntrinsicElements["button"] & {
  icon: TalentIcon;
  active: boolean;
};

export function TalentItem({ icon, active, ...props }: Props) {
  return (
    <button
      className={`talent-icon talent-icon--${icon} ${active ? "active" : ""}`}
      {...props}
    ></button>
  );
}
