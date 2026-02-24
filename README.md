# Student Report Card System

This is a React application built with Vite that manages student report cards using a **URL-driven state architecture**. The project serves as a demonstration of state management where the URL acts as the single source of truth, bypassing traditional React state hooks for global data.

---

## Project Constraints

* **No useState**: Component state for filtering, sorting, and view switching is derived directly from the URL via `useSyncExternalStore`.
* **Vanilla URL Management**: The application uses native `window.history.pushState` and `URLSearchParams` rather than a third-party routing library.
* **Custom Subscription System**: A custom event dispatcher (`urlchange`) ensures the UI stays in sync with programmatic URL updates.

---

## Features

### 1. List View
A tabular representation of student performance data.
* **Filtering**: Filter students by grade (A, B, or Fail).
* **Searching**: Real-time name search that persists in the URL.
* **Sorting**: Toggle between sorting by name or numerical score.

### 2. Carousel View
An interactive 3D display for browsing student cards.
* **Auto-scroll**: The carousel advances automatically and pauses on hover.
* **3D Hover Effects**: Cards utilize CSS perspective for an immersive feel.
* **State Persistence**: Because state is stored in the URL, all filters and search terms remain active when switching between List and Carousel views.

---

## Visuals

### List View Screenshot
(Space reserved for List View screenshot)

### Carousel View Screenshot
(Space reserved for Carousel View screenshot)

---

## Technical Implementation

### Core Architecture
* **Store (`urlState.ts`)**: Manages reading and writing parameters. It handles the logic for the "all" grade filter and ensures parameters are deleted when empty to keep URLs clean.
* **Hooks**: `useFiltersFromUrl` and `useViewFromUrl` subscribe to both `popstate` (browser navigation) and `urlchange` (internal updates).
* **Grade Logic**: The `getGradeInfo` utility maps scores to `GradeLabel` and `GradeClass` enums to ensure visual consistency.



### Tech Stack
* **Framework**: React (Vite)
* **Language**: TypeScript
* **Styling**: Tailwind CSS + DaisyUI

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
  
