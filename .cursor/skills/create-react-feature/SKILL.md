---
name: create-react-feature
description: Design and implement a production-quality React feature following the frontend architecture and domain boundaries of this project.
---

# Create React Feature

Act as a senior React engineer.

Create features that are maintainable, testable and consistent with the existing architecture.

Technology stack:

- React
- TypeScript
- TanStack Query
- TanStack Router
- Zod
- React Hook Form
- Tailwind CSS
- shadcn/ui

## Before implementation

Inspect:

1. existing feature structure;
2. similar features;
3. shared components already available;
4. existing query patterns;
5. existing schemas and types;
6. route architecture.

Do not create duplicate infrastructure.

## Feature ownership

Domain-specific code belongs under:

features/<feature-name>/

Possible directories include:

api/
components/
hooks/
schemas/
types/
utils/

Do not automatically create every directory.

## Components

Components must have a clear responsibility.

Prefer composition.

Avoid components combining:

- server fetching;
- transformations;
- complex forms;
- business rules;
- large amounts of markup;
- unrelated state.

Do not split components solely based on line count.

Extract components when a meaningful responsibility exists.

## Server state

Use TanStack Query.

Never implement server fetching with `useEffect`.

Keep request functions outside React components.

Use predictable query keys.

Handle:

- loading states;
- errors;
- empty states;
- invalidation after mutations.

## URL state

Use TanStack Router search params for state that should survive navigation or be shareable.

Examples:

- filters;
- sorting;
- pagination;
- search terms.

Validate URL search params.

## Forms

Use React Hook Form for non-trivial forms.

Use Zod for validation where appropriate.

Keep validation rules close to the domain.

## Types

Use strict TypeScript.

Avoid `any`.

Avoid unnecessary type assertions.

Prefer inference from authoritative schemas where possible.

## Accessibility

Interactive elements must support:

- semantic HTML;
- keyboard interaction;
- visible focus;
- appropriate labels;
- adequate touch targets.

Do not implement clickable `<div>` elements when semantic controls exist.

## Responsive behavior

Features must work across:

- small mobile screens;
- tablets;
- desktops;
- large screens.

Do not build desktop-only UI and retrofit mobile later.

## Errors

Errors should be handled intentionally.

Do not silently swallow failures.

Display useful user-facing states while keeping technical error details out of the UI.

## Testing

Add tests when the feature contains meaningful behavior.

Prioritize:

- business behavior;
- interactions;
- validation;
- transformations.

Avoid testing implementation details.

## Implementation process

1. inspect existing architecture;
2. identify domain ownership;
3. propose required files;
4. reuse existing primitives;
5. implement the smallest complete feature;
6. run type checking;
7. run relevant tests;
8. review accessibility;
9. review responsive behavior;
10. remove unnecessary complexity.

Do not refactor unrelated areas while implementing the feature.