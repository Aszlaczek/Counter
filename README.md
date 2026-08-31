[README.md](https://github.com/user-attachments/files/31641315/README.md)
# Counter — konwerter i ewidencja godzin pracy

Narzędzie webowe do szybkiego przeliczania minut na format godzina:minuta (np. `90 min → 1h 30min`) oraz prowadzenia ewidencji przepracowanych godzin z eksportem do Excela.

🔗 **Live demo:** [counter-psi-blush.vercel.app](https://counter-psi-blush.vercel.app)

## O projekcie

Aplikacja powstała jako odpowiedź na konkretny, powtarzalny problem pracowników administracji (starostwo): ręczne przeliczanie sum godzin pracy zapisanych w minutach było wolne i podatne na błędy. Zamiast liczyć to w głowie albo w kalkulatorze, aplikacja:

- błyskawicznie przelicza minuty na czytelny format godzin i minut,
- pozwala dodawać i edytować pojedyncze wpisy godzinowe,
- zbiera je w tabeli,
- eksportuje całość do pliku `.xlsx` z polskimi nagłówkami kolumn, gotowego do dalszych obliczeń w Excelu.

Aplikacja nie zapisuje żadnych danych wrażliwych, dzięki czemu — mimo że powstała na potrzeby konkretnego urzędu — może być swobodnie używana przez każdego, kto potrzebuje szybko przeliczyć lub zestawić godziny pracy.

## Funkcjonalności

- ⏱️ **Konwerter minut na godziny** — szybkie przeliczenie bez liczenia w pamięci
- ➕ **Dodawanie wpisów** przez formularz
- ✏️ **Edycja istniejących wpisów** (formularz edycji w oknie modalnym)
- 📋 **Tabela zbiorcza** wszystkich wpisów
- 📤 **Eksport do Excela (.xlsx)** z polskimi nagłówkami kolumn — gotowe do dalszej pracy w arkuszu

## Stack technologiczny

| Warstwa | Technologia |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| State management | Zustand |
| Eksport danych | ExcelJS |
| Lint | ESLint + typescript-eslint |
| Hosting | Vercel |

## Uruchomienie lokalne

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

## Struktura projektu

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

## Autor

Adrian Wzorek
