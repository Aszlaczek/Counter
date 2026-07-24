import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuthStore } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authRes = await authService.login({ username, password });
      localStorage.setItem("access_token", authRes.access_token);
      localStorage.setItem("refresh_token", authRes.refresh_token);

      const profile = await authService.getMe();
      setUser(profile);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Nieprawidłowa nazwa użytkownika lub hasło");
      } else {
        setError("Błąd logowania. Spróbuj ponownie.");
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
          Logowanie
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

        <label htmlFor="username">
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
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Wpisz nazwę użytkownika"
            required
            autoComplete="username"
            style={{ width: "100%" }}
          />
        </label>

        <label htmlFor="password">
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wpisz hasło"
            required
            autoComplete="current-password"
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
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          Nie masz konta?{" "}
          <Link
            to="/register"
            style={{ color: "var(--color-primary)", textDecoration: "none" }}
          >
            Zarejestruj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
