# TODO: Counter v2.0 - Frontend API Integration

## ~~Step 1: Add Dependencies~~

- [x] Install `axios` and `react-router-dom`

## ~~Step 2: Types & Services Layer~~

- [x] Update `src/type.ts` — Add API types (Auth, Person, ExtraHours, etc.)
- [x] Create `src/services/api.ts` — Axios instance with auth interceptors
- [x] Create `src/services/authService.ts` — Login, register, refresh, getMe
- [x] Create `src/services/personService.ts` — Person CRUD
- [x] Create `src/services/extraHoursService.ts` — Extra hours CRUD

## ~~Step 3: Update Store~~

- [x] Rewrite `src/store.ts` — Auth store + token management, keep existing stores but refactor

## Step 4: Auth Components

- [ ] Rewrite `src/components/Login.tsx` — Login form with API call
- [ ] Create `src/components/Register.tsx` — Registration form
- [ ] Create `src/components/ProtectedRoute.tsx` — Auth guard component

## Step 5: Main App & Routing

- [x] Rewrite `src/App.tsx` — React Router setup with auth routing

## Step 6: Dashboard & Person Management

- [x] Create `src/components/Dashboard.tsx` — Main layout after login
- [x] Rewrite `src/components/Form.tsx` — Create person via API
- [x] Rewrite `src/components/Table.tsx` — Fetch/sync persons from API
- [x] Rewrite `src/components/EditForm.tsx` — Edit person via API

## Step 7: Extra Hours Components

- [x] Create `src/components/ExtraHours.tsx` — Extra hours CRUD
- [x] Create `src/components/ExtraHoursSummary.tsx` — Summary per person

## Step 8: CSS & Final Polish

- [x] Build verification passed
- [x] TypeScript compilation passed
