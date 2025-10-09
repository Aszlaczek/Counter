import { useEffect, type FormEvent } from 'react'
import type { User } from '../type'
import { useHoursStore, useStateStore, useUserListStore, useUserStore } from '../store'

const Form = () => {

    const { user, editUser, removeInfo } = useUserStore()
    const { isDone, setStateFalse, setStateTrue } = useStateStore()
    const { allHours, setMin } = useHoursStore()
    const { addToList } = useUserListStore()

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
        const user: User = { name: name as string, surname: surname as string, hours: hours as string, date: Date().split(' ').slice(0, 5).join(' ') }

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
        <form onSubmit={saveUser}>
            <label htmlFor="name">
                <input type="text" name="name" id="name" placeholder='Imię' required value={user.name} onChange={e => editUser('name', e.target.value)} />
            </label>
            <label htmlFor="surname">
                <input type="text" name="surname" id="surname" placeholder='Nazwisko' required value={user.surname} onChange={e => editUser('surname', e.target.value)} />
            </label>
            <label htmlFor="hours">
                <input type="text" name="hours" id="hours" placeholder='0h 0m' value={user.hours} onChange={e => editUser('hours', e.target.value)} />
            </label>
            <button type='submit' disabled={!isDone}>{isDone ? 'Zapisz' : 'Czekaj...'}</button>
        </form>
    )
}

export default Form