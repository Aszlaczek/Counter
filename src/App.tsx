import "./style/App.css";
import Counter from "./components/Counter";
import { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { usePopUpStore } from "./store";
import EditForm from "./components/EditForm";

export default function App() {
  const [showForm, setShowLabel] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { visible } = usePopUpStore();

  const handleToggleForm = () => {
    if (showForm) {
      setIsExiting(true);
      setTimeout(() => {
        setShowLabel(false);
        setIsExiting(false);
      }, 300); // Match the CSS transition duration
    } else {
      setShowLabel(true);
    }
  };
  return (
    <>
      {visible ? <EditForm key="edit-form" /> : ""}
      <div className={`container-main ${visible ? "hide" : ""}`}>
        <Counter />
        <button
          type="button"
          className="btn-open-form"
          onClick={handleToggleForm}
          disabled={visible || isExiting}
        >
          {showForm ? "Zamknij formularz" : "Pokaż formularz"}
        </button>
        {showForm ? <Form key="create-form" isClosing={isExiting} /> : ""}
        <Table />
      </div>
    </>
  );
}
