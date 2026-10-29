# VibeCraft

**A guided creative prompt builder for visual concepts and digital projects.**

VibeCraft transforms creative choices into structured prompt variations. Users select a goal, mood, category and detailed settings through a guided workflow, then save useful results in a local library.

## What it does

- Builds prompts for images, videos, games and digital tools
- Adapts follow-up questions to selected goals and categories
- Produces three prompt variations from rule-based templates
- Saves and removes generated prompts using browser localStorage
- Offers English, Turkish and Arabic interfaces

## Tech stack

React, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Architecture

`User choices → Conditional questions → Prompt templates → Variations → Local library`

Key modules:

- `services/QuestionRouter.ts` — selects contextual questions
- `services/PromptGenerator.ts` — assembles rule-based prompt variations
- `services/Storage.ts` — stores saved results in the browser
- `App.tsx` — coordinates the guided workflow and language settings

## Run locally

```bash
npm ci
npm run dev
```

## Scope and limitations

This is a **frontend prototype**. It generates text prompts, not AI images or videos. The generator does not call a model API. Saved prompts remain in the user's browser rather than syncing to an account. Output quality and target-model compatibility have not been independently evaluated.

## Next improvements

1. Test prompt variation and conditional question logic.
2. Strengthen input validation, storage resilience and accessibility.
3. Introduce a versioned prompt schema and clear export options.
4. Study prompting principles and evaluate results against real use cases.
5. Remove accidentally tracked build artifacts and dependencies in a separate, carefully reviewed cleanup.
6. Add screenshots and a verified demo.

## Author

[Amro Duveydari](https://github.com/amroduveydari1)
