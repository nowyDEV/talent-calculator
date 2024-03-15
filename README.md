# Talent Calculator 9000

## Deployed version available [here](https://talent-calculator.vercel.app/)

## Setup

```bash
npm install
npm run dev
npm run test
```

## TODO

- [x] Improve accessibility, allow selection of talents through keyboard
- [x] Make TalentCalculator configurable through props instead of it relying on static data mock, [this might work](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md)
- [x] Switch to Preact to reduce bundle size (52kb -> 9.6kb) - available on [preact](https://github.com/nowyDEV/talent-calculator/tree/preact) branch
- [x] Add deployment

## Additional features

- State preserved on page refresh
- De-selection also requires order (from last selected to first)
- Talent boxes have labels when hovered, they are selectable/de-selectable by keyboard (navigate with tab/shift+tab, select with space/enter) and touch screens
