import './style/App.css'
import Counter from './components/Counter'
import { useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'
import { usePopUpStore } from './store'
import EditForm from './components/EditForm'

export default function App() {
  const [showForm, setShowLabel] = useState(false)
  const { visible } = usePopUpStore()
  return (
    <>
      {visible ? <EditForm /> : ''}
      <div className={`container-main ${visible ? 'hide' : ''}`}>
        <Counter />
        <button type='button' onClick={() => setShowLabel(!showForm)} disabled={visible}>{showForm ? 'Zamknij formularz' : 'Pokaż formularz'}</button>
        {
          showForm && !visible ? <Form /> : ''
        }
        <Table />
      </div>
    </>
  )
}

