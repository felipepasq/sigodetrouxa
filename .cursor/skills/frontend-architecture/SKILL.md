
# `.cursor/skills/frontend-architecture/SKILL.md`

```md
---
name: frontend-architecture
description: Analyze, design and evolve the frontend architecture of this React application. Use when defining folder structure, module boundaries, feature ownership, shared code placement or major frontend architectural decisions.
---

# Frontend Architecture

Act as a senior frontend architect responsible for the long-term maintainability of the application.

This is a production application expected to grow in features, users, contributors and complexity.

The architecture must support growth without sacrificing simplicity.

Technology stack:

- React
- Vite
- TypeScript
- TanStack Router
- TanStack Query
- Zod
- React Hook Form
- Tailwind CSS
- shadcn/ui

## Architectural goals

Optimize for:

1. clear domain ownership;
2. maintainability;
3. discoverability;
4. type safety;
5. testability;
6. scalability of the codebase;
7. low coupling between domains.

Avoid both extremes:

- unstructured code organized only by technical type;
- unnecessary enterprise architecture and excessive abstractions.

Prefer a feature/domain-oriented architecture.

## Default structure

The target structure is:

apps/web/
  public/

  src/
    app/
      providers.tsx
      router.ts
      query-client.ts

    routes/

    features/
      properties/
      auth/
      favorites/
      saved-searches/
      users/

    components/
      ui/
      layout/
      feedback/

    lib/
      api/
      env/
      validation/

    hooks/

    types/

    styles/

    assets/

    main.tsx
    routeTree.gen.ts

Not every directory must exist immediately.

Create directories when they have a clear responsibility.

## Domain ownership

Business code belongs to the feature that owns the business concept.

Example:

features/
  properties/
    api/
    components/
    hooks/
    schemas/
    types/
    utils/

  favorites/
    api/
    components/
    hooks/
    schemas/
    types/

Avoid global directories containing unrelated domain code.

Avoid:

services/
  property-service.ts
  auth-service.ts
  user-service.ts

Prefer:

features/properties/api/
features/auth/api/
features/users/api/

## Feature structure

A feature may contain:

feature/
  api/
  components/
  hooks/
  schemas/
  types/
  utils/
  tests/

Only create directories that provide real value.

### api/

Owns communication with the backend for the domain.

May contain:

- request functions;
- query definitions;
- mutations;
- query keys;
- API mapping.

### components/

Components containing domain-specific UI.

Example:

features/properties/components/property-card.tsx

### hooks/

Hooks representing domain-specific UI behavior.

Do not create hooks merely to wrap another hook without adding meaningful behavior.

### schemas/

Zod schemas owned by the domain.

Use schemas at boundaries such as:

- API responses;
- forms;
- URL search params;
- external data.

### types/

Domain-specific TypeScript types.

Prefer deriving types from authoritative schemas when appropriate.

### utils/

Pure utilities that only make sense inside the domain.

## Shared components

Root-level:

components/

is reserved for genuinely reusable UI.

### components/ui/

Design-system primitives.

Examples:

Button
Input
Select
Dialog
Badge
Card

These components must not understand business domains.

### components/layout/

Application-wide structural components.

Examples:

Header
Sidebar
AppShell
PageContainer
Navigation

### components/feedback/

Reusable loading, error and empty states.

## routes/

Use TanStack Router file-based routing.

Route files represent route composition rather than entire application features.

Routes should generally:

- validate search params;
- read route params;
- configure loaders;
- enforce route-level authorization;
- orchestrate features;
- render feature entry points.

Do not place substantial business logic inside routes.

Do not create a separate `pages` abstraction when routes already represent navigation entry points unless there is a concrete architectural reason.

TanStack Router's generated `routeTree.gen.ts` must never contain manually maintained business logic.

## app/

Contains application composition and framework configuration.

Examples:

app/
  providers.tsx
  router.ts
  query-client.ts

This layer should know how the application is assembled.
