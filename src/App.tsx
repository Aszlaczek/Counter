import './style/App.css'
import Counter from './components/Counter'
import { useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'

export default function App() {
  const [data, setData] = useState({ name: '', surname: '', hours: '' })
  const [showForm, setShowLabel] = useState(true)

  const handleHours = (e: string) => {
    setData({ ...data, hours: e })
  }

  return (
    <div className='container-main'>
      <Counter handleHours={handleHours} />
      <button type='button' onClick={() => setShowLabel(!showForm)}>{showForm ? 'Zamknij formularz' : 'Pokaż formularz'}</button>
      {
        showForm ? <Form user={data} /> : ''
      }
      <Table />

    </div>
  )
}

