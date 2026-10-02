# Counter — Work Hours Converter & Tracker

*[English](#english) | [Polski](#polski)*

🔗 **Live demo:** [counter-psi-blush.vercel.app](https://counter-psi-blush.vercel.app)

---

<a id="english"></a>
## English

A web tool for quickly converting minutes into an hour:minute format (e.g. `90 min → 1h 30min`) and keeping a log of worked hours with Excel export.

### About the project

The app was built as a response to a specific, recurring problem faced by administrative staff (a Polish county office): manually converting sums of work hours recorded in minutes was slow and error-prone. Instead of doing the math in your head or on a calculator, the app:

- instantly converts minutes into a readable hour/minute format,
- lets you add and edit individual hour entries,
- collects them in a table,
- exports everything to an `.xlsx` file with Polish column headers, ready for further work in Excel.

The app doesn't store any sensitive data, so — even though it was built for a specific office — it can be freely used by anyone who needs to quickly convert or compile work hours.

### Features

- ⏱️ **Minutes-to-hours converter** — instant conversion, no mental math
- ➕ **Adding entries** via a form with auto-reset after submit or close
- ✏️ **Editing existing entries** (edit form in a modal window)
- 🗑️ **Deleting entries** — safe removal with unique ID tracking (no collisions after deletion)
- 📋 **Summary table** of all entries
- 📤 **Excel export (.xlsx)** with Polish column headers — separate **Godziny** (hours) and **Minuty** (minutes) numeric columns for direct formula use

### Tech stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| State management | Zustand |
| Data export | ExcelJS |
| Lint | ESLint + typescript-eslint |
| Hosting | Vercel |

### Running locally

```bash
git clone https://github.com/Aszlaczek/Counter.git
cd Counter
npm install
npm run dev
```

Available scripts:

```bash
npm run dev       # development mode
npm run build     # production build (tsc + vite build)
npm run lint      # lint the code with ESLint
npm run preview   # preview the production build
```

### Project structure

```
src/
├── components/
│   ├── Counter.tsx      # minutes-to-h:min converter
│   ├── Form.tsx         # adding an entry (auto-reset, hours sync)
│   ├── EditForm.tsx     # editing an entry (modal)
│   └── Table.tsx        # entries table + Excel export (split hours/minutes)
├── store.ts             # global state (zustand) — user, hours, list, UI state
├── type.ts              # User type definition
├── App.tsx              # main layout, form toggle with state reset
└── main.tsx             # entry point
```

### Data model

```ts
type User = {
  id: number | null;   // auto-assigned from monotonic counter (nextId)
  name: string;
  surname: string;
  hours: string;       // format: "1h 30min"
  date: string;        // locale date string
}
```

### Excel export format

| Column | Key | Type | Description |
|---|---|---|---|
| L.P. | `lp` | number | Row index (1-based) |
| Imię | `name` | string | First name |
| Nazwisko | `surname` | string | Last name |
| Godziny | `hours` | number | Hours (parsed from "Xh Ymin") |
| Minuty | `minutes` | number | Minutes (parsed from "Xh Ymin") |
| Data | `date` | string | Entry date/time |

### Recent fixes

- **Delete/edit bug** — `getSpecificUser` no longer subtracts 1 from the ID; editing and deleting now target the correct user
- **ID collisions** — new entries use a monotonic `nextId` counter instead of `list.length`, preventing conflicts after deletion
- **Form reset** — name/surname/hours fields clear after submit and when the form is closed without submitting
- **Excel formulas** — hours and minutes are exported as separate numeric columns so users can create formulas directly in Excel

### Author

Adrian Wzorek

---

<a id="polski"></a>
## Polski

Narzędzie webowe do szybkiego przeliczania minut na format godzina:minuta (np. `90 min → 1h 30min`) oraz prowadzenia ewidencji przepracowanych godzin z eksportem do Excela.

### O projekcie

Aplikacja powstała jako odpowiedź na konkretny, powtarzalny problem pracowników administracji (starostwo): ręczne przeliczanie sum godzin pracy zapisanych w minutach było wolne i podatne na błędy. Zamiast liczyć to w głowie albo w kalkulatorze, aplikacja:

- błyskawicznie przelicza minuty na czytelny format godzin i minut,
- pozwala dodawać i edytować pojedyncze wpisy godzinowe,
- zbiera je w tabeli,
- eksportuje całość do pliku `.xlsx` z polskimi nagłówkami kolumn, gotowego do dalszych obliczeń w Excelu.

Aplikacja nie zapisuje żadnych danych wrażliwych, dzięki czemu — mimo że powstała na potrzeby konkretnego urzędu — może być swobodnie używana przez każdego, kto potrzebuje szybko przeliczyć lub zestawić godziny pracy.

### Funkcjonalności

- ⏱️ **Konwerter minut na godziny** — szybkie przeliczenie bez liczenia w pamięci
- ➕ **Dodawanie wpisów** przez formularz z automatycznym czyszczeniem po zapisu lub zamknięciu
- ✏️ **Edycja istniejących wpisów** (formularz edycji w oknie modalnym)
- 🗑️ **Usuwanie wpisów** — bezpieczne usuwanie z unikalnymi ID (bez kolizji po usunięciu)
- 📋 **Tabela zbiorcza** wszystkich wpisów
- 📤 **Eksport do Excela (.xlsx)** z polskimi nagłówkami kolumn — osobne kolumny **Godziny** i **Minuty** (liczbowe) do bezpośredniego tworzenia formuł

### Stack technologiczny

| Warstwa | Technologia |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| State management | Zustand |
| Eksport danych | ExcelJS |
| Lint | ESLint + typescript-eslint |
| Hosting | Vercel |

### Uruchomienie lokalne

```bash
git clone https://github.com/Aszlaczek/Counter.git
cd Counter
npm install
npm run dev
```

Dostępne skrypty:

```bash
npm run dev       # tryb deweloperski
npm run build     # build produkcyjny (tsc + vite build)
npm run lint      # sprawdzenie kodu ESLintem
npm run preview   # podgląd builda produkcyjnego
```

### Struktura projektu

```
src/
├── components/
│   ├── Counter.tsx      # konwerter minut na h:min
│   ├── Form.tsx         # dodawanie wpisu (auto-reset, synchronizacja godzin)
│   ├── EditForm.tsx     # edycja wpisu (modal)
│   └── Table.tsx        # tabela wpisów + eksport do Excela (osobne godziny/minuty)
├── store.ts             # stan globalny (zustand) — user, hours, list, UI
├── type.ts              # definicja typu User
├── App.tsx              # główny layout, przełączanie formularza z resetem stanu
└── main.tsx             # punkt wejścia
```

### Model danych

```ts
type User = {
  id: number | null;   // przypisywane automatycznie z licznika (nextId)
  name: string;
  surname: string;
  hours: string;       // format: "1h 30min"
  date: string;        // data w formacie lokalnym
}
```

### Format eksportu do Excela

| Kolumna | Klucz | Typ | Opis |
|---|---|---|---|
| L.P. | `lp` | liczba | Numer wiersza (od 1) |
| Imię | `name` | tekst | Imię |
| Nazwisko | `surname` | tekst | Nazwisko |
| Godziny | `hours` | liczba | Godziny (parsowane z "Xh Ymin") |
| Minuty | `minutes` | liczba | Minuty (parsowane z "Xh Ymin") |
| Data | `date` | tekst | Data/czas wpisu |

### Ostatnie poprawki

- **Błąd usuwania/edycji** — `getSpecificUser` nie odejmuje już 1 od ID; edycja i usuwanie trafiają we właściwego użytkownika
- **Kolizje ID** — nowe wpisy używają monotonicznego licznika `nextId` zamiast `list.length`, co zapobiega konfliktom po usunięciu
- **Reset formularza** — pola imię/nazwisko/godziny czyszczą się po zapisu i po zamknięciu formularza bez zapisu
- **Formuły w Excelu** — godziny i minuty są eksportowane jako osobne kolumny liczbowe, umożliwiając bezpośrednie tworzenie formuł

### Autor

Adrian Wzorek
