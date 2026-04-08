import { usePopUpStore, useUserListStore, useUserStore } from "../store"
import '../style/Table.css';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import editIcon from '../assets/edit-svgrepo-com.svg'
import deleteIcon from '../assets/delete-svgrepo-com.svg'

const Table = () => {
    const { list, removeUser, getSpecificUser } = useUserListStore()
    const { show, visible } = usePopUpStore()
    const { setUser } = useUserStore()

    const getUserHandler = (id: number) => {
        show()
        const user = getSpecificUser(id)
        if (user) {
            setUser(user)
            return
        }
        alert(`Błąd: Nie znaleziono użytkownika o ID: ${id}`)
    }

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(list)
        const workbook = XLSX.utils.book_new();
        const date = new Date().toISOString().split('T')[0]
        XLSX.utils.book_append_sheet(workbook, worksheet, `Dane`)
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(blob, `Rozliczenie_${date}.xlsx`)
    }

    if (list.length === 0) return null;

    return (
        <div className="container-outer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)' }}>Zapisane Dane</h3>
                {list.length >= 1 && <button className='btn-export' onClick={handleExport}>Eksportuj do Excel</button>}
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
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.surname}</td>
                                <td>{e.hours}</td>
                                <td>
                                    <div className="table-actions">
                                        <button className="btn-icon" disabled={visible} onClick={() => getUserHandler(i)} title="Edytuj">
                                            <img src={editIcon} alt="Edytuj" />
                                        </button>
                                        <button className="btn-icon" disabled={visible} onClick={() => removeUser(i)} title="Usuń">
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
    )
}

export default Table
