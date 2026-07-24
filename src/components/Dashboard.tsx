import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, usePersonListStore } from "../store";
import { personService } from "../services/personService";
import Counter from "./Counter";
import Form from "./Form";
import Table from "./Table";
import EditForm from "./EditForm";
import ExtraHours from "./ExtraHours";
import ExtraHoursSummary from "./ExtraHoursSummary";

type ActiveTab = "persons" | "extra-hours" | "summary";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { setList } = usePersonListStore();
  const [showForm, setShowForm] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("persons");
  const fetchPersons = useCallback(async () => {
    try {
      const persons = await personService.getAll();
      setList(persons);
    } catch {
      console.error("Failed to fetch persons");
    }
  }, [setList]);

  useEffect(() => {
    if (activeTab === "persons") {
      fetchPersons();
    }
  }, [activeTab, fetchPersons]);

  const handleToggleForm = () => {
    if (showForm) {
      setIsExiting(true);
      setTimeout(() => {
        setShowForm(false);
        setIsExiting(false);
      }, 300);
    } else {
      setShowForm(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container-main">
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--color-card-border)",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "var(--font-size-2xl)",
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Panel administracyjny
          </h1>
          {user && (
            <p
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              Zalogowano jako: <strong>{user.username}</strong>
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid var(--color-card-border)",
            color: "var(--color-text-muted)",
            padding: "0.5rem 1rem",
            fontSize: "var(--font-size-sm)",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
          }}
        >
          Wyloguj się
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { key: "persons", label: "Osoby" },
          { key: "extra-hours", label: "Nadgodziny" },
          { key: "summary", label: "Podsumowanie" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as ActiveTab)}
            style={{
              background:
                activeTab === tab.key
                  ? "var(--gradient-primary)"
                  : "var(--color-card-bg)",
              color: activeTab === tab.key ? "white" : "var(--color-text)",
              border: "1px solid var(--color-card-border)",
              padding: "0.6rem 1.2rem",
              fontSize: "var(--font-size-sm)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontWeight: "var(--font-weight-medium)",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content based on active tab */}
      {activeTab === "persons" && (
        <>
          <Counter />
          <button
            type="button"
            className="btn-open-form"
            onClick={handleToggleForm}
          >
            {showForm ? "Zamknij formularz" : "Pokaż formularz"}
          </button>
          {showForm && (
            <Form
              key="create-form"
              isClosing={isExiting}
              onSuccess={() => {
                setShowForm(false);
                fetchPersons();
              }}
            />
          )}
          <Table onUpdate={fetchPersons} />
          <EditForm onUpdate={fetchPersons} />
        </>
      )}

      {activeTab === "extra-hours" && <ExtraHours />}
      {activeTab === "summary" && <ExtraHoursSummary />}
    </div>
  );
};

export default Dashboard;
