import { MouseEvent } from "react";
import { Talent } from "../types";
import { TalentItem } from "../TalentItem/TalentItem";
import { useTalentCalculatorStore } from "../store";
import "./styles.css";

const mouseButtons = {
  left: 0,
  right: 2,
};

export function TalentPath({
  name,
  talents,
}: {
  name: string;
  talents: readonly Talent[];
}) {
  const activeTalents = useTalentCalculatorStore((state) => state.talents);
  const addTalent = useTalentCalculatorStore((state) => state.addTalent);
  const removeTalent = useTalentCalculatorStore((state) => state.removeTalent);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    talent: Talent
  ) => {
    if (event.button === mouseButtons.left) {
      addTalent(talent);
      return;
    }

    if (event.button === mouseButtons.right) {
      removeTalent(talent);
    }
  };

  return (
    <div className="talent-path">
      <span className="talent-path__name">{name}</span>
      <ul className="talent-path__list">
        {talents.map((talent) => (
          <TalentItem
            key={talent.id}
            icon={talent.icon}
            onClick={(event) => handleClick(event, talent)}
            onContextMenu={(event) => {
              event.preventDefault();
              handleClick(event, talent);
            }}
            active={activeTalents.some(
              (activeTalent) => activeTalent.id === talent.id
            )}
            name={talent.name}
            data-testid={talent.id}
          />
        ))}
      </ul>
    </div>
  );
}
