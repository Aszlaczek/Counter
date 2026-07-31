import { useState, type FormEvent } from "react";
import { personService } from "../services/personService";
import "../style/Form.css";

type Props = {
  isClosing?: boolean;
  onSuccess?: () => void;
};

const Form = ({ isClosing, onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [faculty, setFaculty] = useState("Unknown");

  const saveUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await personService.create({
        name,
        surname,
        faculty: faculty || "Unknown",
      });

      setName("");
      setSurname("");
      setFaculty("Unknown");
      onSuccess?.();
    } catch (err) {
      alert("Nie udało się dodać osoby. Sprawdź połączenie z API.");
    }
  };

  return (
    <form
      onSubmit={saveUser}
      className={`form-create ${isClosing ? "exiting" : ""}`}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "var(--color-text)",
        }}
      >
        Dodaj Nową Osobę
      </h3>
      <label htmlFor="name">
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            marginLeft: "0.5rem",
          }}
        >
          Imię
        </p>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Wpisz imię"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
      </label>
      <label htmlFor="surname">
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            marginLeft: "0.5rem",
          }}
        >
          Nazwisko
        </p>
        <input
          type="text"
          name="surname"
          id="surname"
          placeholder="Wpisz nazwisko"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          autoComplete="off"
        />
      </label>
      <label htmlFor="faculty">
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            marginLeft: "0.5rem",
          }}
        >
          Wydział
        </p>
        <input
          type="text"
          name="faculty"
          id="faculty"
          placeholder="Wydział"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          autoComplete="off"
        />
      </label>
      <button type="submit">Dodaj do Listy</button>
    </form>
  );
};

export default Form;
