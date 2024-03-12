import { render, screen } from "@testing-library/react";
import { TalentCalculator } from "./TalentCalculator";
import { test, expect, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { useTalentCalculatorStore } from "./store";
import { data } from "../data";

test("selects talents and increases counter", async () => {
  render(<TalentCalculator {...data} />);

  const firstTalent = screen.getByTestId("0");
  await userEvent.click(firstTalent);
  const pointsCounter = screen.getByText("1 / 6");
  expect(pointsCounter).toBeInTheDocument();

  const nextTalent = screen.getByTestId("1");
  await userEvent.click(nextTalent);
  const nextPointsCounter = screen.getByText("2 / 6");
  expect(nextPointsCounter).toBeInTheDocument();
});

test("de-selects talent and decreases counter", async () => {
  render(<TalentCalculator {...data} />);

  const firstTalent = screen.getByTestId("0");
  await userEvent.click(firstTalent);
  const nextTalent = screen.getByTestId("1");
  await userEvent.click(nextTalent);

  await userEvent.pointer({ keys: "[MouseRight>]", target: nextTalent });

  const pointsCounter = screen.getByText("1 / 6");
  expect(pointsCounter).toBeInTheDocument();
});

test("cannot de-select talents that are not last in path", async () => {
  render(<TalentCalculator {...data} />);

  const firstTalent = screen.getByTestId("0");
  await userEvent.click(firstTalent);
  const secondTalent = screen.getByTestId("1");
  await userEvent.click(secondTalent);
  const thirdTalent = screen.getByTestId("2");
  await userEvent.click(thirdTalent);

  await userEvent.pointer({ keys: "[MouseRight>]", target: secondTalent });

  const pointsCounter = screen.getByText("3 / 6");
  expect(pointsCounter).toBeInTheDocument();
});

test("cannot select talents without activating previous ones in path", async () => {
  render(<TalentCalculator {...data} />);

  const el = screen.getByTestId("3");
  await userEvent.click(el);

  const pointsCounter = screen.getByText("0 / 6");
  expect(pointsCounter).toBeInTheDocument();
});

test("does not increase counter when clicking on activated talent", async () => {
  render(<TalentCalculator {...data} />);

  const firstTalent = screen.getByTestId("0");
  await userEvent.click(firstTalent);
  await userEvent.dblClick(firstTalent);
  await userEvent.tripleClick(firstTalent);

  const pointsCounter = screen.getByText("1 / 6");
  expect(pointsCounter).toBeInTheDocument();
});

test("cannot select additional talents when all points are used", async () => {
  const talentIds = [0, 1, 2, 3, 4, 5, 6, 7];

  render(<TalentCalculator {...data} />);

  for (const talentId of talentIds) {
    const talentIcon = screen.getByTestId(talentId);
    await userEvent.click(talentIcon);
  }

  const pointsCounter = screen.getByText("6 / 6");
  expect(pointsCounter).toBeInTheDocument();
});

afterEach(() => {
  useTalentCalculatorStore.getState().reset();
});
