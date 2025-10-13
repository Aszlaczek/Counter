import { type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../type'
import { usePopUpStore, useUserListStore, useUserStore } from '../store'

const EditForm = () => {

    const { user, editUser, removeInfo } = useUserStore()
    const { setSpecificUser } = useUserListStore()
    const { hide } = usePopUpStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Get Data from Form
        const data = new FormData(e.currentTarget)
        const [name, surname, hours] = [data.get('e-name'), data.get('e-surname'), data.get('e-hours')]

        // Create user
        const editUser: User = { id: user.id, name: name as string, surname: surname as string, hours: hours as string, date: Date().split(' ').slice(0, 5).join(' ') }

        // Set user into UsersList
        setSpecificUser(user.id as number, editUser)
        alert("zapisano")

        // Hide and remove info 
        hide()
        removeInfo()
    }

    const setChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [name, value] = [e.target.name.split('-')[1], e.target.value]
        editUser(name, value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edytuj</h2>
            <label htmlFor="e-name">
                <p>Imię</p>
                <input type="text" name="e-name" required id="e-name" value={user.name} onChange={e => setChange(e)} />
            </label>
            <label htmlFor="e-surname">
                <p>Nazwisko</p>
                <input type="text" name="e-surname" required id="e-surname" value={user.surname} onChange={e => setChange(e)} />
            </label>
            <label htmlFor="e-hours">
                <p>Godziny</p>
                <input type="text" name="e-hours" required id="e-hours" value={user.hours} onChange={e => setChange(e)} />
            </label>
            <div className="container-btn">
                <button type="button" onClick={hide}>Cofnij</button>
                <button type="submit">Zapisz</button>
            </div>
        </form>
    )
}

export default EditForm