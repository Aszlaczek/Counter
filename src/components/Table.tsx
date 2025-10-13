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
                        <p>L.P.</p>
                    </th>
                    <th>
                        <p>Imię</p>
                    </th>
                    <th>
                        <p>Nazwisko</p>
                    </th>
                    <th>
                        <p>Godziny</p>
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
                                <button className="btn" disabled={visible} onClick={() => getUserHandler(i)}>Edytuj</button>
                                <button className="btn" disabled={visible} onClick={() => removeUser(i)}>Usuń</button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

export default Table

