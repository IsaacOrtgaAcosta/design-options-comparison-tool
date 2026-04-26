# 🧩 Design Options App

## 📌 Summary

Design Options App is a frontend-focused application that allows users to create, import, and compare architectural design alternatives based on key performance metrics.

This project is built with a strong emphasis on:
- Robust data handling (especially from unreliable external APIs)
- Clean architecture and separation of concerns
- Scalable and maintainable frontend patterns
- UX resilience under imperfect data conditions

---

## 🚀 Core Features

- Create design options manually via form (with validation)
- Import options from an external API (DummyJSON mock endpoint)
- Normalize inconsistent API data into a stable domain model
- Select up to 4 options and compare them side by side
- Persist data in Supabase
- Handle missing, null, or invalid data gracefully in UI

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React + Tailwind CSS + shadcn/ui
- **State:** React hooks
- **Backend / DB:** Supabase (PostgreSQL)
- **External API:** DummyJSON (custom mock endpoint)

---

## 🧠 Technical Highlights

### 1. Defensive Data Mapping (Critical)

External APIs are treated as unreliable sources.

A normalization layer (`mapImportedOptions`) ensures:
- Missing values are handled safely
- Types are coerced correctly
- UI never breaks due to malformed data

Example:

```ts
const toNumber = (
  value: number | null | undefined,
  fallback: number,
): number => {
  return typeof value === "number" && !Number.isNaN(value) ? value : fallback;
};
```

---

### 2. UI Resilience

The UI is designed to work even with incomplete data:

- Metrics fallback to `"–"` when invalid or missing
- Conditional styling avoids misleading visual signals
- Arrays (tags, pros, cons) render safely even when empty

---

### 3. Clean Architecture

The project follows a modular structure:

- `services/` → API interactions (Supabase + external)
- `utils/` → formatters, mappers, helpers
- `components/` → UI components
- `types/` → domain models

This separation ensures:
- Testability
- Reusability
- Scalability

---

### 4. Comparison System

- Multi-selection via checkbox (max 4 items)
- Derived comparison state
- Side-by-side visualization
- Automatic scroll to comparison panel (UX improvement)

---

### 5. Import Strategy

- External data is fetched via configurable endpoint
- Data is normalized before entering the app
- Pagination-ready (`limit` / `skip`)
- Designed to optionally persist imported data into DB

---

## ⚙️ Environment Setup

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://nwrtnztpfxsyjmvxwugp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_438XHM09pen7vBocUEaqXg_HNFX2h0p
NEXT_PUBLIC_IMPORT_OPTIONS_ENDPOINT=https://dummyjson.com/c/7f14-8ac1-41a0-acac
```

---

## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🧪 What This Project Demonstrates

This project intentionally focuses on real-world frontend concerns:

- Handling unreliable external data
- Designing resilient UI systems
- Maintaining clean architecture under feature growth
- Managing derived state (selection, comparison)
- Providing a consistent UX across edge cases

---

## 🧭 Planning & Documentation

Full planning, architecture decisions, and workflow:

👉 [Notion](https://foil-dolomite-17f.notion.site/Design-Options-Prototype-34c09da405e4801aaac2cd80723d2b81)

---

## 🔮 Possible Improvements

- Proper server-side pagination for imports
- Deduplication of imported records
- Edit/update existing options
- Advanced comparison (charts, scoring)
- Filtering & sorting
- Authentication & user-specific data

---

## 🧑‍💻 Author

Developed as part of a technical assessment, with focus on:

- Code quality
- Architecture decisions
- Real-world robustness
- UX under imperfect conditions
