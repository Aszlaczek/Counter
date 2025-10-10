import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { User } from '../type'

const EditForm = (props: { data: User }) => {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        setUser(props.data)
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    const setChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                <input type="text" name="name" id="name" value={user!.name} onChange={e => setChange(e)} />
            </label>
        </form>
    )
}

export default EditForm