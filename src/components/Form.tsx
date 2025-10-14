import { useEffect, type FormEvent } from 'react'
import type { User } from '../type'
import { useHoursStore, usePopUpStore, useStateStore, useUserListStore, useUserStore } from '../store'
import '../style/Form.css';

const Form = () => {

    const { user, editUser, removeInfo } = useUserStore()
    const { isDone, setStateFalse, setStateTrue } = useStateStore()
    const { allHours, setMin } = useHoursStore()
    const { addToList, list } = useUserListStore()
    const { visible } = usePopUpStore()

    useEffect(() => {
        editUser('hours', allHours)
    }, [allHours])


    const saveUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Set wait to false
        setStateFalse()

        // Get data from Form
        const data = new FormData(e.currentTarget)
        const [name, surname, hours] = [data.get('name'), data.get('surname'), data.get('hours')]
        const user: User = { id: list.length, name: name as string, surname: surname as string, hours: hours as string, date: Date().split(' ').slice(0, 5).join(' ') }

        console.log(hours)

        addToList(user)
        removeInfo()
        setMin(0)

        setTimeout(() => {
            console.log(user)
            setStateTrue()
        }, 1000)

    }

    return (
        <form onSubmit={saveUser} className={'form-create'}>
            <label style={{ '--item': 1 }} htmlFor="name">
                <input className={`${visible ? 'hide' : ''}`} type="text" name="name" id="name" placeholder='Imię' required value={user.name} onChange={e => editUser('name', e.target.value)} />
            </label>
            <label style={{ '--item': 2 }} htmlFor="surname">
                <input className={`${visible ? 'hide' : ''}`} type="text" name="surname" id="surname" placeholder='Nazwisko' required value={user.surname} onChange={e => editUser('surname', e.target.value)} />
            </label>
            <label style={{ '--item': 3 }} htmlFor="hours">
                <input className={`${visible ? 'hide' : ''}`} type="text" name="hours" id="hours" placeholder='0h 0m' value={user.hours} onChange={e => editUser('hours', e.target.value)} />
            </label>
            <button type='submit' disabled={!isDone}>{isDone ? 'Zapisz' : 'Czekaj...'}</button>
        </form>
    )
}

export default Form