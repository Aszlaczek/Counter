import { usePopUpStore, useUserListStore, useUserStore } from "../store"
import '../style/Table.css';

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

    return (
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
                                    <img src='src/public/edit-svgrepo-com.svg' alt="edit-icon" />
                                </button>
                                <button className="btn" disabled={visible} onClick={() => removeUser(i)}>
                                    <img src='src\public\delete-svgrepo-com.svg' alt="delete-icon" />
                                </button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

export default Table

