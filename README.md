# Student Report Card System

This React application uses a **URL-driven state architecture**. It demonstrates state management where the URL is the single source of truth, bypassing `useState` and `useMemo` for global data.

---

## Project Constraints

* **No useState**: State is derived from URL via `useSyncExternalStore`.
* **Vanilla URL Management**: Uses `window.history.pushState` and `URLSearchParams`.
* **Custom Subscription**: A `urlchange` event keeps the UI in sync with programmatic updates.

---

## Features

### 1. List View

Tabular data with filtering, searching, and sorting.

### 2. Carousel View

3D display with auto-scroll and hover effects.

### 3. State Persistence

Filters remain active when switching views via URL parameters.

---

## Visuals

### List View Screenshot

(Space reserved)

### Carousel View Screenshot

(Space reserved)

---

## Technical Implementation

* **Store (urlState.ts)**: Handles parameter logic and the "all" grade filter.
* **Hooks**: `useFiltersFromUrl` and `useViewFromUrl` subscribe to `popstate` and `urlchange`.
* **Grade Logic**: `getGradeInfo` maps scores to labels and CSS classes.

---

## Getting Started

1. **Install**: `npm install`
2. **Dev**: `npm run dev`
3. **Build**: `npm run build`
