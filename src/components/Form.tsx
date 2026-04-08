import { useEffect, type FormEvent } from 'react'
import type { User } from '../type'
import { useHoursStore, usePopUpStore, useStateStore, useUserListStore, useUserStore } from '../store'
import '../style/Form.css';

const Form = ({ isClosing }: { isClosing?: boolean }) => {
    const { user, editUser, removeInfo } = useUserStore()
    const { isDone, setStateFalse, setStateTrue } = useStateStore()
    const { allHours, setMin } = useHoursStore()
    const { addToList, list } = useUserListStore()
    const { visible } = usePopUpStore()

    useEffect(() => {
        editUser('hours', allHours)
    }, [allHours, editUser])

    const saveUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStateFalse()

        const data = new FormData(e.currentTarget)
        const [name, surname, hours] = [data.get('name'), data.get('surname'), data.get('hours')]
        const newUser: User = { 
            id: list.length, 
            name: name as string, 
            surname: surname as string, 
            hours: hours as string, 
            date: new Date().toLocaleString() 
        }

        addToList(newUser)
        removeInfo()
        setMin(0)

        setTimeout(() => {
            setStateTrue()
        }, 800)
    }

    return (
        <form onSubmit={saveUser} className={`form-create ${visible ? 'hide' : ''} ${isClosing ? 'exiting' : ''}`}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-text)' }}>Dodaj Nowy Wpis</h3>
            <label htmlFor="name">
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>Imię</p>
                <input type="text" name="name" id="name" placeholder='Wpisz imię' required value={user.name} onChange={e => editUser('name', e.target.value)} autoComplete="off" />
            </label>
            <label htmlFor="surname">
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>Nazwisko</p>
                <input type="text" name="surname" id="surname" placeholder='Wpisz nazwisko' required value={user.surname} onChange={e => editUser('surname', e.target.value)} autoComplete="off" />
            </label>
            <label htmlFor="hours">
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>Zliczone godziny</p>
                <input type="text" name="hours" id="hours" placeholder='0h 0m' value={user.hours} onChange={e => editUser('hours', e.target.value)} />
            </label>
            <button type='submit' disabled={!isDone}>
                {isDone ? 'Dodaj do Listy' : 'Przetwarzanie...'}
            </button>
        </form>
    )
}

export default Form