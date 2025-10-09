import './style/App.css'
import Counter from './components/Counter'
import { useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'

export default function App() {
  const [data, setData] = useState({ name: '', surname: '', hours: '', date: Date() })
  const [showForm, setShowLabel] = useState(true)

  return (
    <div className='container-main'>
      <Counter />
      <button type='button' onClick={() => setShowLabel(!showForm)}>{showForm ? 'Zamknij formularz' : 'Pokaż formularz'}</button>
      {
        showForm ? <Form user={data} /> : ''
      }
      <Table />

    </div>
  )
}

