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
  const { handleKeyboardClick, handleMouseClick, handleTouchEvent } =
    useTalentUserEventHandlers();

  return (
    <div className="talent-path">
      <span className="talent-path__name">{name}</span>
      <ul
        className="talent-path__list"
        role="tablist"
        aria-labelledby="talent-tablist"
      >
        {talents.map((talent) => {
          return (
            <TalentItem
              key={talent.id}
              icon={talent.icon}
              title={talent.name}
              role="tab"
              aria-label={talent.name}
              aria-selected={talent.active}
              active={talent.active}
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
                handleKeyboardClick(event, talent, talent.active)
              }
              onTouchEnd={() => handleTouchEvent(talent, talent.active)}
            />
          );
        })}
      </ul>
    </div>
  );
}

function useTalentUserEventHandlers() {
  const { activateTalent, deactivateTalent } = useTalentCalculatorState();

  const handleMouseClick = (event: MouseEvent, talent: Talent) => {
    if (event.button === mouseButtons.left) {
      activateTalent(talent);
      return;
    }

    if (event.button === mouseButtons.right) {
      deactivateTalent(talent);
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
        deactivateTalent(talent);
      } else {
        activateTalent(talent);
      }
    }
  };

  const handleTouchEvent = (talent: Talent, isTalentActive: boolean) => {
    if (isTalentActive) {
      deactivateTalent(talent);
    } else {
      activateTalent(talent);
    }
  };

  return { handleMouseClick, handleKeyboardClick, handleTouchEvent };
}
