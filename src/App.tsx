import { useState, type FormEvent } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState('')
  const [count, setCount] = useState('')

  const submit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    const hour = Math.floor(Number(value) / 60)
    let min: number | string = Number(value) - hour * 60
    min = min < 10 ? `0${min}` : min


    setCount(`${hour}h: ${min}min`)
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="inp">
        <p>Napisz wartość godzin w minutach</p>
        <input type="number" name="inp" id="inp" onChange={e => setValue(e.target.value)} min={0} />
      </label>
      <p>Wartość przeliczona</p>
      <h1>{count}</h1>
      <button type='submit'>Licz</button>
    </form>
  )
}

export default App
