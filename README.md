# Talent Calculator 9000

## Setup

```bash
npm install
npm run dev
npm run test
```

## TODO

- [x] Improve accessibility, allow selection of talents through keyboard
- [ ] Make TalentCalculator configurable through props instead of it relying on static data mock, [this might work](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md)
- [ ] Switch to Preact to reduce bundle size

## Additional features

- State preserved on page refresh
- De-selection also requires order (from last selected to first)
- Talent boxes have labels when hovered, they are selectable by keyboard (navigate with tab/shift+tab, select with space/enter)
