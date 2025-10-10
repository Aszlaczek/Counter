import { useUserListStore } from "../store"
import '../style/Table.css';


const Table = () => {

    const { list, removeUser } = useUserListStore()

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
                                {/* <button className="btn" onClick={() => editUser(i)}>Edytuj</button> */}
                                <button className="btn" onClick={() => removeUser(i)}>Usuń</button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

export default Table

