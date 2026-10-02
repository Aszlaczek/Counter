import { useEffect, type FormEvent } from 'react'
import type { User } from '../type'
import { useHoursStore, usePopUpStore, useStateStore, useUserListStore, useUserStore } from '../store'
import { formatMinutes } from '../utils/time'
import '../style/Form.css';

const Form = ({ isClosing }: { isClosing?: boolean }) => {
    const { user, editUser, removeInfo } = useUserStore()
    const { isDone, setStateFalse, setStateTrue } = useStateStore()
    const { min, setMin } = useHoursStore()
    const { addToList } = useUserListStore()
    const { visible } = usePopUpStore()

    useEffect(() => {
        editUser('minutes', min)
    }, [min, editUser])

    const saveUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStateFalse()

        const data = new FormData(e.currentTarget)
        const [name, surname, minutes] = [data.get('name'), data.get('surname'), data.get('minutes')]
        const newUser: User = {
            id: null,
            name: name as string,
            surname: surname as string,
            minutes: Number(minutes),
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
            <label htmlFor="minutes">
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>Minuty</p>
                <input type="number" name="minutes" id="minutes" placeholder='0' required min={0} max={9999} step={1} inputMode="numeric" value={user.minutes} onChange={e => editUser('minutes', Number(e.target.value))} autoComplete="off" />
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>= {formatMinutes(user.minutes)}</p>
            </label>
            <button type='submit' disabled={!isDone}>
                {isDone ? 'Dodaj do Listy' : 'Przetwarzanie...'}
            </button>
        </form>
    )
}

export default Form
