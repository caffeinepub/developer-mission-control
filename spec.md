# Developer Mission Control

## Current State
CodingTimetable.tsx has inline text editing and category select per row, but no way to add/remove rows, and no AI schedule generation.

## Requested Changes (Diff)

### Add
- Edit mode toggle button in timetable header that reveals per-row controls (add row above/below, delete row, drag handle for reorder)
- AI Timetable Generator modal: user fills in preferences (wake-up time, study hours, focus areas, goal), then AI logic creates a full timetable and populates the slots
- "Generate with AI" button in timetable header
- Add/remove time slots beyond the default 18 hours

### Modify
- CodingTimetable.tsx: support dynamic number of slots (not locked to HOURS array), add edit mode UI, add AI generator dialog

### Remove
- Nothing removed

## Implementation Plan
1. Make slots array include a `time` field so rows are not tied to the static HOURS array
2. Add `editMode` boolean state; show add/delete controls when active
3. Build `AIGeneratorDialog` inside the file: form with wake-up time, available hours, focus mix (sliders), daily goal text
4. On submit, run deterministic AI logic to create slots array and call setSlots
5. Persist all changes to LocalStorage as before
