import { useEffect, type FormEvent } from "react";
import { personService } from "../services/personService";
import { useHoursStore, useUserStore } from "../store";
import "../style/Form.css";

type Props = {
  isClosing?: boolean;
  onSuccess?: () => void;
};

const Form = ({ isClosing, onSuccess }: Props) => {
  const { user, editUser, removeInfo } = useUserStore();
  const { allHours, setMin } = useHoursStore();

  useEffect(() => {
    editUser("hours", allHours);
  }, [allHours, editUser]);

  const saveUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await personService.create({
        name: user.name,
        surname: user.surname,
        hours: user.hours || "0h 0min",
      });

      removeInfo();
      setMin(0);
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
        Dodaj Nowy Wpis
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
          value={user.name}
          onChange={(e) => editUser("name", e.target.value)}
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
          value={user.surname}
          onChange={(e) => editUser("surname", e.target.value)}
          autoComplete="off"
        />
      </label>
      <label htmlFor="hours">
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            marginLeft: "0.5rem",
          }}
        >
          Zliczone godziny
        </p>
        <input
          type="text"
          name="hours"
          id="hours"
          placeholder="0h 0m"
          value={user.hours}
          onChange={(e) => editUser("hours", e.target.value)}
        />
      </label>
      <button type="submit">Dodaj do Listy</button>
    </form>
  );
};

export default Form;
