import { useState, useEffect } from "react";
import { extraHoursService } from "../services/extraHoursService";
import { personService } from "../services/personService";
import type { ExtraHoursSummary as SummaryType, Person } from "../type";

const ExtraHoursSummary = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<number>(0);
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const data = await personService.getAll();
        setPersons(data);
      } catch {
        console.error("Failed to fetch persons");
      }
    };
    fetchPersons();
  }, []);

  const fetchSummary = async () => {
    if (!selectedPersonId) return;
    setLoading(true);
    try {
      const data = await extraHoursService.getSummary(selectedPersonId);
      setSummary(data);
    } catch {
      alert("Nie udało się pobrać podsumowania.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPersonId) {
      fetchSummary();
    } else {
      setSummary(null);
    }
  }, [selectedPersonId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h3 style={{ fontSize: "var(--font-size-lg)" }}>Podsumowanie nadgodzin</h3>

      <div style={{ maxWidth: "400px" }}>
        <label htmlFor="summary-person">
          <p
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            Wybierz osobę
          </p>
          <select
            id="summary-person"
            value={selectedPersonId}
            onChange={(e) => setSelectedPersonId(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "var(--color-card-bg)",
              border: "1px solid var(--color-card-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text)",
              backdropFilter: "var(--glass-blur)",
            }}
          >
            <option value={0}>-- Wybierz osobę --</option>
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.surname}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && (
        <p style={{ color: "var(--color-text-muted)" }}>
          Ładowanie podsumowania...
        </p>
      )}

      {summary && !loading && (
        <>
          <div
            style={{
              background: "var(--color-card-bg)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--color-card-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
            }}
          >
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
              Osoba:{" "}
              <strong style={{ color: "var(--color-text)" }}>
                {summary.person_name} {summary.person_surname}
              </strong>
            </p>
            <p
              style={{
                fontSize: "var(--font-size-2xl)",
                fontWeight: "var(--font-weight-bold)",
                marginTop: "0.5rem",
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Łącznie: {summary.total_hours}
            </p>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>L.P.</th>
                  <th>Godziny</th>
                  <th>Opis</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {summary.records.map((record, i) => (
                  <tr key={record.id}>
                    <td>{i + 1}</td>
                    <td>{record.hours}</td>
                    <td>{record.description || "-"}</td>
                    <td>{record.date}</td>
                  </tr>
                ))}
                {summary.records.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Brak rekordów nadgodzin dla tej osoby
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!selectedPersonId && !loading && (
        <p
          style={{
            color: "var(--color-text-muted)",
            textAlign: "center",
            padding: "3rem",
          }}
        >
          Wybierz osobę, aby zobaczyć podsumowanie nadgodzin
        </p>
      )}
    </div>
  );
};

export default ExtraHoursSummary;

