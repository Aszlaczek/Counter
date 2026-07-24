import { useState, useEffect, type FormEvent } from "react";
import { extraHoursService } from "../services/extraHoursService";
import { personService } from "../services/personService";
import { useExtraHoursListStore, usePersonListStore } from "../store";
import type { Person } from "../type";

const ExtraHours = () => {
  const {
    list: extraList,
    setList: setExtraList,
    addToList,
    removeFromList,
  } = useExtraHoursListStore();
  const { list: persons, setList: setPersons } = usePersonListStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<number>(0);
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [extraData, personsData] = await Promise.all([
          extraHoursService.getAll(),
          personService.getAll(),
        ]);
        setExtraList(extraData);
        setPersons(personsData);
      } catch {
        console.error("Failed to fetch data");
      }
    };
    fetchData();
  }, [setExtraList, setPersons]);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPersonId) return;

    try {
      const created = await extraHoursService.create({
        person_id: selectedPersonId,
        hours,
        description: description || undefined,
      });
      addToList(created);
      setHours("");
      setDescription("");
      setShowForm(false);
    } catch {
      alert("Nie udało się dodać nadgodzin.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Usunąć ten rekord?")) return;
    try {
      await extraHoursService.delete(id);
      removeFromList(id);
    } catch {
      alert("Nie udało się usunąć.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontSize: "var(--font-size-lg)" }}>Nadgodziny</h3>
        <button
          className="btn-open-form"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Zamknij" : "Dodaj nadgodziny"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="form-create"
          style={{ padding: "1.5rem" }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Dodaj Nadgodziny
          </h3>

          <label htmlFor="eh-person">
            <p
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-muted)",
                marginLeft: "0.5rem",
              }}
            >
              Osoba
            </p>
            <select
              id="eh-person"
              value={selectedPersonId}
              onChange={(e) => setSelectedPersonId(Number(e.target.value))}
              required
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
              {persons.map((p: Person) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.surname}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="eh-hours">
            <p
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-muted)",
                marginLeft: "0.5rem",
              }}
            >
              Godziny
            </p>
            <input
              type="text"
              id="eh-hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="np. 2h 30min"
              required
              style={{ width: "100%" }}
            />
          </label>

          <label htmlFor="eh-desc">
            <p
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-muted)",
                marginLeft: "0.5rem",
              }}
            >
              Opis (opcjonalnie)
            </p>
            <input
              type="text"
              id="eh-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opis..."
              style={{ width: "100%" }}
            />
          </label>

          <button type="submit">Zapisz</button>
        </form>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Osoby</th>
              <th>Godziny</th>
              <th>Opis</th>
              <th>Data</th>
              <th>Opcje</th>
            </tr>
          </thead>
          <tbody>
            {extraList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.person_id}</td>
                <td>{item.hours}</td>
                <td>{item.description || "-"}</td>
                <td>{item.date}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn-icon"
                      onClick={() => handleDelete(item.id)}
                      title="Usuń"
                    >
                      <img
                        src="/delete-svgrepo-com.svg"
                        alt="Usuń"
                        style={{ width: 18, height: 18 }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {extraList.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Brak rekordów nadgodzin
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExtraHours;
