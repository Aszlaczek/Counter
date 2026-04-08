import { type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../type'
import { usePopUpStore, useUserListStore, useUserStore } from '../store'
import '../style/EditForm.css'

const EditForm = () => {
    const { user, editUser, removeInfo } = useUserStore()
    const { setSpecificUser } = useUserListStore()
    const { hide } = usePopUpStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const [name, surname, hours] = [data.get('e-name'), data.get('e-surname'), data.get('e-hours')]

        const editedUser: User = { 
            id: user.id, 
            name: name as string, 
            surname: surname as string, 
            hours: hours as string, 
            date: new Date().toLocaleString() 
        }

        setSpecificUser(user.id as number, editedUser)
        hide()
        removeInfo()
    }

    const setChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [name, value] = [e.target.name.split('-')[1], e.target.value]
        editUser(name, value)
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
                    <input type="text" name="e-name" required id="e-name" value={user.name} onChange={e => setChange(e)} autoComplete="off" />
                </label>
                <label htmlFor="e-surname">
                    <p>Nazwisko</p>
                    <input type="text" name="e-surname" required id="e-surname" value={user.surname} onChange={e => setChange(e)} autoComplete="off" />
                </label>
                <label htmlFor="e-hours">
                    <p>Godziny</p>
                    <input type="text" name="e-hours" required id="e-hours" value={user.hours} onChange={e => setChange(e)} autoComplete="off" />
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