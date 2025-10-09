import { useEffect, useState, type FormEvent } from 'react'
import type { User } from '../type'
import { useUserStore } from '../store'

const Form = (props: { user: User }) => {

    const { user, editUser, addUser } = useUserStore()
    const [hours, setHours] = useState('')
    const [isDone, setIsDone] = useState(true)

    useEffect(() => {
        setHours(user.hours)
    }, [user.hours])


    const saveUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Set wait to false
        setIsDone(false)

        // Get data from Form
        const data = new FormData(e.currentTarget)
        const [name, surname] = [data.get('name'), data.get('surname')]
        const user: User = { name: name as string, surname: surname as string, hours: hours, date: Date().split(' ').slice(0, 5).join(' ') }
        addUser(user)


        setTimeout(() => {
            console.log(name, surname, hours)
            console.log(user)
            setIsDone(true)
        }, 1000)

    }

    return (
        <form onSubmit={saveUser}>
            <label htmlFor="name">
                <input type="text" name="name" id="name" placeholder='Imię' required />
            </label>
            <label htmlFor="surname">
                <input type="text" name="surname" id="surname" placeholder='Nazwisko' required />
            </label>
            <label htmlFor="hours">
                <input type="text" name="hours" id="hours" value={user.hours} onChange={e => editUser('hours', e.target.value)} />
            </label>
            <button type='submit'>{isDone ? 'Zapisz' : 'Zapisuję...'}</button>
        </form>
    )
}

export default Form