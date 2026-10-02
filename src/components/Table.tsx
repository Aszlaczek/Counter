import { usePopUpStore, useUserListStore, useUserStore } from "../store";
import "../style/Table.css";
import ExcelJS from "exceljs";
import editIcon from "../assets/edit-svgrepo-com.svg";
import deleteIcon from "../assets/delete-svgrepo-com.svg";
import { formatMinutes, splitMinutes } from "../utils/time";

const Table = () => {
  const { list, removeUser, getSpecificUser } = useUserListStore();
  const { show, visible } = usePopUpStore();
  const { setUser } = useUserStore();

  const getUserHandler = (id: number) => {
    show();
    const user = getSpecificUser(id);
    if (user) {
      setUser(user);
      return;
    }
    alert(`Błąd: Nie znaleziono użytkownika o ID: ${id}`);
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dane");

    // Define Polish column headers
    worksheet.columns = [
      { header: "L.P.", key: "lp", width: 8 },
      { header: "Imię", key: "name", width: 20 },
      { header: "Nazwisko", key: "surname", width: 25 },
      { header: "Godziny", key: "hours", width: 15 },
      { header: "Minuty", key: "minutes", width: 15 },
      { header: "Łącznie minut", key: "totalMinutes", width: 18 },
      { header: "Data", key: "date", width: 22 },
    ];

    // Add rows with index starting from 1
    list.forEach((user, i) => {
      const { hours, minutes } = splitMinutes(user.minutes);
      worksheet.addRow({
        lp: i + 1,
        name: user.name,
        surname: user.surname,
        hours: hours,
        minutes: minutes,
        totalMinutes: user.minutes,
        date: user.date,
      });
    });

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    const date = new Date().toISOString().split("T")[0];
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rozliczenie_${date}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (list.length === 0) return null;

  return (
    <div
      className="container-outer"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontSize: "var(--font-size-lg)" }}>Zapisane Dane</h3>
        {list.length >= 1 && (
          <button className="btn-export" onClick={handleExport}>
            Eksportuj do Excel
          </button>
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>L.P.</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Godziny</th>
              <th>Opcje</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.surname}</td>
                <td>{formatMinutes(e.minutes)}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn-icon"
                      disabled={visible}
                      onClick={() => getUserHandler(e.id as number)}
                      title="Edytuj"
                    >
                      <img src={editIcon} alt="Edytuj" />
                    </button>
                    <button
                      className="btn-icon"
                      disabled={visible}
                      onClick={() => removeUser(e.id as number)}
                      title="Usuń"
                    >
                      <img src={deleteIcon} alt="Usuń" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
