import { MouseEvent, KeyboardEvent } from "react";
import { Talent } from "../types";
import { TalentItem } from "../TalentItem/TalentItem";
import { useTalentCalculatorStore } from "../store";
import "./styles.css";

const mouseButtons = {
  left: 0,
  right: 2,
};

type Props = {
  name: string;
  talents: readonly Talent[];
};

export function TalentPath({ name, talents }: Props) {
  const activeTalents = useTalentCalculatorStore((state) => state.talents);
  const addTalent = useTalentCalculatorStore((state) => state.addTalent);
  const removeTalent = useTalentCalculatorStore((state) => state.removeTalent);

  const handleMouseClick = (
    event: MouseEvent<HTMLButtonElement>,
    talent: Talent
  ) => {
    if (event.button === mouseButtons.left) {
      addTalent(talent);
      return;
    }

    if (event.button === mouseButtons.right) {
      removeTalent(talent);
      return;
    }
  };

  const handleKeyboardClick = (
    event: KeyboardEvent<HTMLButtonElement>,
    talent: Talent,
    isTalentActive: boolean
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      if (isTalentActive) {
        removeTalent(talent);
      } else {
        addTalent(talent);
      }
    }
  };

  const handleTouchEvent = (talent: Talent, isTalentActive: boolean) => {
    if (isTalentActive) {
      removeTalent(talent);
    } else {
      addTalent(talent);
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
              active={isActive}
              name={talent.name}
              data-testid={talent.id}
              onMouseDown={(event) => handleMouseClick(event, talent)}
              onContextMenu={(event) => {
                event.preventDefault();
                handleMouseClick(event, talent);
              }}
              onKeyDown={(event) =>
                handleKeyboardClick(event, talent, isActive)
              }
              onTouchEnd={() => handleTouchEvent(talent, isActive)}
            />
          );
        })}
      </ul>
    </div>
  );
}
