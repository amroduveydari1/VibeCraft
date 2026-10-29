# VibeCraft

**A guided prompt builder for creative projects.**

VibeCraft helps turn creative ideas into structured text prompts for image, video, game, and digital product concepts.

## Features

- Goal-based wizard with contextual follow-up questions
- Three rule-based prompt variations
- Adjustable moods, styles, and creative settings
- Local prompt library
- English, Turkish, and Arabic interfaces

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion

## How it works

`Creative choices → Contextual questions → Prompt templates → Three variations`

The core logic lives in `services/QuestionRouter.ts` and `services/PromptGenerator.ts`. Saved prompts use browser `localStorage` through `services/Storage.ts`.

## Run locally

```bash
npm ci
npm run dev
```

## Status

**Frontend prototype.** VibeCraft generates prompt text, not images or videos. It does not call an AI model API, and its saved library is browser-local. Output quality has not yet been systematically evaluated.

## Next steps

Add generator tests, improve input validation and accessibility, evaluate outputs against real creative tasks, and add verified screenshots.

[Development roadmap](https://github.com/amroduveydari1/VibeCraft/issues/2) · Built by [Amro Duveydari](https://github.com/amroduveydari1)
