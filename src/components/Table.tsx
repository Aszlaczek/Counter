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
        alert(`No user have id: ${id}`)
    }

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(list)
        const workbook = XLSX.utils.book_new();

        const date = Date().split(' ').slice(0, 5).join(' ')

        XLSX.utils.book_append_sheet(workbook, worksheet, `Dane`)

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(blob, `Obecnosc_${date}.xlsx`)
    }

    return (
        <>
            {console.log(editIcon, deleteIcon)}
            {list.length >= 2 ? <button className='btn-export' onClick={handleExport}>Exportuj</button> : ''}
            <table>
                <thead>
                    <tr>
                        <th>
                            <h3>L.P.</h3>
                        </th>
                        <th>
                            <h3>Imię</h3>
                        </th>
                        <th>
                            <h3>Nazwisko</h3>
                        </th>
                        <th>
                            <h3>Godziny</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((e, i) => {
                        return (
                            < tr key={i} >

                                <td><p>{i + 1}</p></td>
                                <td><p>{e.name}</p></td>
                                <td><p>{e.surname}</p></td>
                                <td><p>{e.hours}</p></td>
                                <td>
                                    <button className="btn" disabled={visible} onClick={() => getUserHandler(i)}>
                                        <img src={`${editIcon ?? '/edit-svgrepo-com.svg'}`} alt="edit-icon" />
                                    </button>
                                    <button className="btn" disabled={visible} onClick={() => removeUser(i)}>
                                        <img src={`${deleteIcon ?? '/delete-svgrepo-com.svg'}`} alt="delete-icon" />
                                    </button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </>
    )
}

export default Table

