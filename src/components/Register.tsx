import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Hasła nie są zgodne");
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    setLoading(true);

    try {
      await authService.register({ username, email, password });
      setSuccess("Konto utworzone! Za chwilę zostaniesz przekierowany...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Nie udało się utworzyć konta. Spróbuj ponownie.");
      } else {
        setError("Wystąpił błąd serwera.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--color-card-bg)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid var(--color-card-border)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "var(--font-size-2xl)",
            background: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rejestracja
        </h2>

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "var(--font-size-sm)",
              textAlign: "center",
              padding: "0.5rem",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "var(--radius-md)",
            }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            style={{
              color: "#22c55e",
              fontSize: "var(--font-size-sm)",
              textAlign: "center",
              padding: "0.5rem",
              background: "rgba(34, 197, 94, 0.1)",
              borderRadius: "var(--radius-md)",
            }}
          >
            {success}
          </p>
        )}

        <label htmlFor="reg-username">
          <p
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            Nazwa użytkownika
          </p>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Wpisz nazwę użytkownika"
            required
            autoComplete="username"
            style={{ width: "100%" }}
          />
        </label>

        <label htmlFor="reg-email">
          <p
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            Email
          </p>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Wpisz adres email"
            required
            autoComplete="email"
            style={{ width: "100%" }}
          />
        </label>

        <label htmlFor="reg-password">
          <p
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            Hasło
          </p>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 znaków"
            required
            autoComplete="new-password"
            style={{ width: "100%" }}
          />
        </label>

        <label htmlFor="reg-confirm">
          <p
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            Potwierdź hasło
          </p>
          <input
            type="password"
            id="reg-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Powtórz hasło"
            required
            autoComplete="new-password"
            style={{ width: "100%" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "var(--gradient-primary)",
            color: "white",
            padding: "0.75rem 1.5rem",
            fontSize: "var(--font-size-base)",
            fontWeight: "var(--font-weight-bold)",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {loading ? "Rejestracja..." : "Zarejestruj się"}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          Masz już konto?{" "}
          <Link
            to="/login"
            style={{ color: "var(--color-primary)", textDecoration: "none" }}
          >
            Zaloguj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
