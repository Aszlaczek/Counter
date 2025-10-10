import './style/App.css'
import Counter from './components/Counter'
import { useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'

export default function App() {
  const [showForm, setShowLabel] = useState(false)

  return (
    <div className='container-main'>
      <Counter />
      <button type='button' onClick={() => setShowLabel(!showForm)}>{showForm ? 'Zamknij formularz' : 'Pokaż formularz'}</button>
      {
        showForm ? <Form /> : ''
      }
      <Table />

    </div>
  )
}

