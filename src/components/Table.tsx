import { useUserListStore } from "../store"


const Table = () => {

    const { list } = useUserListStore()
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <p>L.P</p>
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
                            <td><button className="btn">Edytuj</button></td>
                            <td><button className="btn">Usuń</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

export default Table