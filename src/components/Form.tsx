import React, { useEffect, useState, type FormEvent } from 'react'
import type { User } from '../type'

const Form = (props: { user: User }) => {

    const [hours, setHours] = useState('')

    useEffect(() => {
        setHours(props.user.hours)
    }, [props.user])

    const [isDone, setIsDone] = useState(true)

    const saveUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Set wait to false
        setIsDone(false)

        // Get data from Form
        const data = new FormData(e.currentTarget)
        const [name, surname] = [data.get('name'), data.get('surname')]

        const user: User = { name: name as string, surname: surname as string, hours: hours }
        setTimeout(() => {
            console.log(name, surname, hours)
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
                <input type="text" name="hours" id="hours" value={hours} onChange={e => setHours(e.target.value)} />
            </label>
            <button type='submit'>{isDone ? 'Zapisz' : 'Zapisuję...'}</button>
        </form>
    )
}

export default Form