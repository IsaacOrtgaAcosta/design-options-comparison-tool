# 🧩 Design Options App

## 🌐 Live Demo

👉 [Open live demo](https://design-options-comparison-tool.vercel.app/)

---

## 📌 Summary

Design Options App is a small product prototype for reviewing, creating, importing, and comparing early-stage architectural design options.

The goal is to support decision-making by helping users quickly understand trade-offs between different design proposals using key metrics such as embodied carbon, daylight score, cost estimate, and program fit.

The project focuses on:

- Clear browsing and comparison of design options
- Manual creation of new options
- Importing external options from a public endpoint
- Practical persistence with Supabase
- Defensive data mapping from unreliable external data
- Reusable UI structure with shadcn/ui components
- Loading, empty, and error states
- UX resilience under imperfect data conditions

---

## 🚀 Core Features

- Browse existing design options
- Open option details in a modal
- Create new design options manually through a form
- Validate required fields and numeric ranges
- Import external options from a custom DummyJSON endpoint
- Normalize imported data before it enters the UI
- Persist manually created and imported options in Supabase
- Select up to 4 options and compare them side by side
- Remove current comparison selection
- Handle loading, empty, and error states
- Render incomplete or invalid data safely

---

## 🧠 Approach

I understood the assignment as a decision-support prototype rather than just a CRUD interface.

The main user need is to quickly review multiple design proposals, understand their key differences, and decide which options are worth discussing further.

For that reason, I prioritized:

- Fast scanning of options in the main list
- A modal-based detail view to keep users in context
- A simple comparison flow
- Data consistency before rendering
- Practical persistence
- Robust handling of external data
- Clear UI feedback for empty, loading, and error states

Given the time constraint, I avoided overbuilding features such as authentication, editing, deleting, advanced filtering, or complex charts.

Instead, I focused on making the required core workflow reliable:

```txt
browse → inspect → create/import → compare
```

The required part of the assignment took a little over the suggested timebox. I then spent some additional time improving the visual design and UX details, especially around comparison clarity and feedback states.

---

## 🧱 Tech Stack

- **Next.js (App Router)**  
  Chosen for fast setup, modern React patterns, and a clean structure for a frontend-focused prototype.

- **React**  
  Used for component-driven UI and local interaction state such as selected options, modals, loading states, and comparison state.

- **Tailwind CSS + shadcn/ui**  
  Chosen to move quickly while keeping the UI consistent through reusable primitives such as buttons, inputs, cards, dialogs, alerts, checkboxes, and loading indicators.

- **Supabase (PostgreSQL)**  
  Used as a lightweight persistence layer. It provides a realistic backend without requiring a custom API for this prototype.

- **DummyJSON custom endpoint**  
  Used as a public external source to demonstrate importing, transforming, and normalizing outside data.

---

## 🧱 Data Model

The application uses a frontend domain model in camelCase.

```ts
export type DesignOption = {
  id: string;

  name: string;
  description: string;
  area: string;

  embodiedCarbon: number;
  daylightScore: number;
  costEstimate: number;
  programFit: number;

  tags: string[];
  notes?: string;

  source: "manual" | "imported";

  createdAt: string;
  updatedAt: string;

  pros: string[];
  cons: string[];

  referenceUrl?: string[];
};
```

The Supabase table is named:

```txt
design_options
```

Supabase uses snake_case column names, while the frontend uses camelCase. Because of this, the app includes dedicated mapper functions to translate between database rows and the internal domain model.

Examples:

```txt
embodied_carbon → embodiedCarbon
daylight_score → daylightScore
cost_estimate → costEstimate
program_fit → programFit
created_at → createdAt
updated_at → updatedAt
reference_url → referenceUrl
```

### Why this model?

The selected fields are intended to support comparison between early-stage design proposals.

The model combines:

- Descriptive information: `name`, `description`, `area`, `notes`
- Quantitative comparison metrics: `embodiedCarbon`, `daylightScore`, `costEstimate`, `programFit`
- Qualitative review data: `tags`, `pros`, `cons`
- Source tracking: `source`
- External references: `referenceUrl`
- Persistence metadata: `createdAt`, `updatedAt`

The `source` field helps distinguish manually created options from imported options.

The `updatedAt` field is included even though editing is not currently implemented, because it would support future edit/update workflows.

---

## 🔄 Data Flow

The application separates the external API shape, the database shape, and the frontend domain model.

```txt
DummyJSON endpoint
  → mapImportedOptions
  → DesignOption
  → mapDesignOptionToDb
  → Supabase
  → mapDbToDesignOption
  → UI
```

This keeps the UI independent from both the external API format and the Supabase database format.

The relevant mapping files are organized under:

```txt
features/design-options/utils/
```

Including:

```txt
map-imported-options.ts
map-db-to-design-options.ts
map-design-option-to-db.ts
```

---

## 🔄 Import Strategy

External data is imported from a custom DummyJSON endpoint.

The import flow fetches options in batches of 4, maps the incoming data into the internal `DesignOption` model, and then saves the imported options to Supabase.

This means imported options become part of the same persisted dataset as manually created options.

External data is treated as unreliable. The app does not assume that incoming values are complete, correctly typed, or ready to render.

A normalization layer ensures that:

- Missing strings receive fallback values
- Invalid or missing numbers receive safe fallback values
- Nullable arrays are converted into safe arrays
- Empty array values are filtered
- Imported options receive a clear `source: "imported"` marker
- The UI does not break if the external data is incomplete

Example:

```ts
const toNumber = (
  value: number | null | undefined,
  fallback: number,
): number => {
  return typeof value === "number" && !Number.isNaN(value) ? value : fallback;
};

const toString = (
  value: string | null | undefined,
  fallback: string,
): string => {
  return value?.trim() || fallback;
};

const toStringArray = (value: string[] | null | undefined): string[] => {
  return Array.isArray(value) ? value.filter(Boolean) : [];
};
```

---

## 🧩 Main Product Flows

### 1. Option List

The main view displays available design options with enough information to support quick scanning.

Users can review key metrics without opening every option individually.

### 2. Option Detail

Each option can be opened in a modal to review more detailed information such as description, notes, pros, cons, tags, source, and reference URLs.

A modal was chosen to keep the user in the same context instead of navigating away from the list.

### 3. Manual Creation

Users can create new design options through a form.

The form uses manual validation to keep the prototype lightweight and avoid adding unnecessary dependencies.

Validation includes:

- Required name
- Required description
- Required metric fields
- Numeric validation for carbon, cost, daylight score, and program fit
- Carbon and cost cannot be negative
- Daylight score and program fit must stay within the expected score range
- Comma-separated values are parsed into arrays for tags, pros, cons, and reference URLs

Created options are saved directly to Supabase, so data persists after refresh.

### 4. External Import

Users can import options from the public DummyJSON endpoint.

Imported options are normalized and persisted in Supabase, making them part of the same dataset as manually created options.

### 5. Comparison

Users can select up to 4 options and compare them side by side.

The comparison button stays disabled until at least one option is selected. As users select options, the button shows the current selected count.

The comparison limit is intentional: it keeps the UI readable and avoids visual overload.

Users can also remove the current selection, which clears the comparison panel.

---

## ⚖️ Key Decisions and Trade-offs

### Supabase instead of local JSON

Supabase was chosen to make persistence more realistic and closer to a real-world workflow.

**Trade-off:**  
It adds environment configuration and database setup, but provides a more practical persistence layer than local JSON or localStorage.

### Client-side focused architecture

The app is frontend-focused, with Supabase used directly from the client.

**Trade-off:**  
This keeps the prototype simple and fast to build, but a production version would likely introduce server-side logic, stricter permissions, and more controlled API boundaries.

### Manual form validation

The creation form uses local React state and manual validation instead of adding libraries such as react-hook-form or zod.

**Trade-off:**  
This keeps dependencies low and the form easy to understand for the current scope, but a larger form system would benefit from schema-based validation.

### Modal for option detail

The detail view is displayed in a modal instead of a separate page.

**Trade-off:**  
This keeps the browsing flow fast and contextual, but a dedicated route could be useful later for shareable links or deeper review workflows.

### Comparison limited to 4 options

The comparison view supports up to 4 selected options.

**Trade-off:**  
This reduces flexibility, but improves readability and keeps the comparison useful on screen.

### No edit/delete in the MVP

Editing and deleting were intentionally left out of the current version.

**Trade-off:**  
This kept the scope focused on the required flows: browsing, reviewing, creating, importing, comparing, and persisting data. These actions would be natural next steps if the prototype evolved.

### Defensive data mapping

A normalization layer was added between the external API and the UI.

**Trade-off:**  
It adds extra code, but makes the application more robust and prevents malformed external data from breaking the interface.

---

## 🧪 UI Resilience

The UI is designed to handle incomplete or imperfect data gracefully.

Examples:

- Invalid or missing metrics fall back to safe display values
- Empty arrays render safely
- Conditional styles avoid misleading visual signals
- Loading states are shown while data is being fetched
- Empty states guide users when no options are available
- Error states communicate when something goes wrong
- Save/import actions provide feedback while asynchronous work is running

This was important because the assignment explicitly involved importing data from an external source.

---

## 📁 Project Structure

The project is organized around a feature-based structure.

```txt
src/
  app/
  components/
    ui/
  features/
    design-options/
      components/
        actions/
        details/
        forms/
        lists/
        states/
        ui/
      services/
      types/
      utils/
  lib/
```

### Main structure

- `components/ui/`  
  Shared shadcn/ui primitives such as buttons, inputs, dialogs, alerts, cards, checkboxes, and loading indicators.

- `features/design-options/components/actions/`  
  Components related to user actions such as creating or importing options.

- `features/design-options/components/details/`  
  Detail modal components.

- `features/design-options/components/forms/`  
  Form components for manual creation.

- `features/design-options/components/lists/`  
  Components responsible for rendering lists or grids of options.

- `features/design-options/components/states/`  
  Empty and error state components.

- `features/design-options/components/ui/`  
  Feature-specific UI components such as cards, metric badges, and comparison panels.

- `features/design-options/services/`  
  Supabase and external API interactions.

- `features/design-options/types/`  
  Domain types for design options.

- `features/design-options/utils/`  
  Mappers, formatters, metric helpers, and transformation utilities.

This structure keeps the design-options feature isolated and makes it easier to extend later.

---

## ⚙️ Environment Setup

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_IMPORT_OPTIONS_ENDPOINT=https://dummyjson.com/c/7f14-8ac1-41a0-acac
```

The deployed version already includes the required environment variables.

For local development, the Supabase project must include the `design_options` table.

---

## 📦 Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

---

## 🧪 What This Project Demonstrates

This project demonstrates:

- Breaking down a product requirement into clear user flows
- Structuring frontend code around a feature domain
- Handling external data safely before rendering it
- Mapping between external API data, Supabase rows, and frontend domain models
- Persisting application data with Supabase
- Managing derived UI state for selection and comparison
- Designing reusable UI patterns without overbuilding a design system
- Making pragmatic trade-offs within a limited timebox

---

## 🧭 Planning & Documentation

Full planning, architecture decisions, and workflow:

👉 [Notion](https://foil-dolomite-17f.notion.site/Design-Options-Prototype-34c09da405e4801aaac2cd80723d2b81)

---

## 🔮 Possible Improvements

With more time, I would improve the prototype by adding:

- Edit/update existing options
- Delete options
- Deduplication for imported records
- Filtering and sorting
- Advanced comparison with charts or weighted scoring
- Server-side pagination for imports
- Authentication and user-specific data
- More robust Supabase policies
- Schema-based form validation with zod
- Form handling with react-hook-form for larger forms
- Automated tests for mappers and form validation
- A dedicated detail route for shareable option pages

---

## 🧑‍💻 Author

Developed as part of a technical assessment, with focus on:

- Product thinking
- Code quality
- Architecture decisions
- Real-world robustness
- UI consistency
- UX under imperfect data conditions
