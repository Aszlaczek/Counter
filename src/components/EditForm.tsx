import { type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../type'
import { usePopUpStore, useUserListStore, useUserStore } from '../store'
import { formatMinutes } from '../utils/time'
import '../style/EditForm.css'

const EditForm = () => {
    const { user, editUser, removeInfo } = useUserStore()
    const { setSpecificUser } = useUserListStore()
    const { hide } = usePopUpStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user.id === null) {
            alert("Błąd: Nie znaleziono użytkownika")
            return
        }

        const data = new FormData(e.currentTarget)
        const [name, surname, minutes] = [data.get('e-name'), data.get('e-surname'), data.get('e-minutes')]

        const editedUser: User = {
            id: user.id,
            name: name as string,
            surname: surname as string,
            minutes: Number(minutes),
            date: new Date().toLocaleString()
        }

        setSpecificUser(user.id, editedUser)
        hide()
        removeInfo()
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        editUser('name', e.target.value)
    }

    const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
        editUser('surname', e.target.value)
    }

    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        editUser('minutes', Number(e.target.value))
    }

    const handleHide = () => {
        hide()
        removeInfo()
    }

    return (
        <>
            <div className="modal-overlay" onClick={handleHide} />
            <form onSubmit={handleSubmit} className='form-edit'>
                <h3>Edytuj Dane</h3>
                <label htmlFor="e-name">
                    <p>Imię</p>
                    <input type="text" name="e-name" required id="e-name" value={user.name} onChange={handleNameChange} autoComplete="off" />
                </label>
                <label htmlFor="e-surname">
                    <p>Nazwisko</p>
                    <input type="text" name="e-surname" required id="e-surname" value={user.surname} onChange={handleSurnameChange} autoComplete="off" />
                </label>
                <label htmlFor="e-minutes">
                    <p>Minuty</p>
                    <input type="number" name="e-minutes" required id="e-minutes" min={0} max={9999} step={1} inputMode="numeric" value={user.minutes} onChange={handleMinutesChange} autoComplete="off" />
                    <p>= {formatMinutes(user.minutes)}</p>
                </label>
                <div className="container-btn">
                    <button type="button" className="btn-cancel" onClick={handleHide}>Anuluj</button>
                    <button type="submit" className="btn-update">Zapisz Zmiany</button>
                </div>
            </form>
        </>
    )
}

export default EditForm