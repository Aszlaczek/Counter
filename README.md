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
- ➕ **Adding entries** via a form
- ✏️ **Editing existing entries** (edit form in a modal window)
- 📋 **Summary table** of all entries
- 📤 **Excel export (.xlsx)** with Polish column headers — ready for further work in a spreadsheet

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
│   ├── Form.tsx         # adding an entry
│   ├── EditForm.tsx     # editing an entry
│   └── Table.tsx        # entries table + Excel export
├── store/                # global state (zustand)
└── App.tsx
```

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
- ➕ **Dodawanie wpisów** przez formularz
- ✏️ **Edycja istniejących wpisów** (formularz edycji w oknie modalnym)
- 📋 **Tabela zbiorcza** wszystkich wpisów
- 📤 **Eksport do Excela (.xlsx)** z polskimi nagłówkami kolumn — gotowe do dalszej pracy w arkuszu

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
│   ├── Form.tsx         # dodawanie wpisu
│   ├── EditForm.tsx     # edycja wpisu
│   └── Table.tsx        # tabela wpisów + eksport do Excela
├── store/                # stan globalny (zustand)
└── App.tsx
```

### Autor

Adrian Wzorek
