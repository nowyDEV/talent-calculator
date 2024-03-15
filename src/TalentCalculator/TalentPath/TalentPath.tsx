import { Talent } from "../types";
import { TalentItem } from "../TalentItem/TalentItem";
import { useTalentCalculatorState } from "../useTalentCalculatorState";
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
  const state = useTalentCalculatorState();
  const activeTalents = state.talents.value ?? [];

  const handleMouseClick = (event: MouseEvent, talent: Talent) => {
    if (event.button === mouseButtons.left) {
      state.addTalent(talent);
      return;
    }

    if (event.button === mouseButtons.right) {
      state.removeTalent(talent);
      return;
    }
  };

  const handleKeyboardClick = (
    event: KeyboardEvent,
    talent: Talent,
    isTalentActive: boolean
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      if (isTalentActive) {
        state.removeTalent(talent);
      } else {
        state.addTalent(talent);
      }
    }
  };

  const handleTouchEvent = (talent: Talent, isTalentActive: boolean) => {
    if (isTalentActive) {
      state.removeTalent(talent);
    } else {
      state.addTalent(talent);
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
              onMouseDown={(event: MouseEvent) =>
                handleMouseClick(event, talent)
              }
              onContextMenu={(event: MouseEvent) => {
                event.preventDefault();
                handleMouseClick(event, talent);
              }}
              onKeyDown={(event: KeyboardEvent) =>
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
