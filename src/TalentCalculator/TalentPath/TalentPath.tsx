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
      <ul
        className="talent-path__list"
        role="tablist"
        aria-labelledby="talent-tablist"
      >
        {talents.map((talent) => {
          const isActive = activeTalents.some(
            (activeTalent) => activeTalent.id === talent.id
          );

          return (
            <TalentItem
              key={talent.id}
              icon={talent.icon}
              title={talent.name}
              role="tab"
              aria-label={talent.name}
              aria-selected={isActive}
              onClick={(event) => handleClick(event, talent)}
              onContextMenu={(event) => {
                event.preventDefault();
                handleClick(event, talent);
              }}
              active={isActive}
              name={talent.name}
              data-testid={talent.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
