import { useEffect, useState } from 'react'
import '../../../styles/Input.css'
import './AddCustomer.css'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'

export const AddCustomer = () => {
  const { addCustomer } = useCustomerActions()

  const [customerData, setCustomerData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  })

  useEffect(() => {
    document.title = 'Add Customer - Sales Control';
  }, []); 

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = customerData.customerName
    const email = customerData.customerEmail
    const phone = customerData.customerPhone
    // Verificar que no haya inputs vacios
    if (name === '' && email === '' && phone === '') {
      console.log('campos vacios')
      return;
    }

    // Verificar que name no esté cargado ya
    // Verificar que email no esté cargado ya
    addCustomer({name, email, phone})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const { name, value } = target

    const newCustomer = {
      ...customerData,
      [name]: value
    }

    setCustomerData(newCustomer)
  }

  return (
    <main className='addCustomer-main'>
      <div className='addCustomer-container'>
        <h1>Add new customer</h1>
        <form className='addCustomer-form' onSubmit={handleAddCustomer} action="">
          <div>
            <label htmlFor="customerName">Nombre</label>
            <input 
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Jorge Lopez"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerEmail">Email</label>
            <input 
              type="email"
              id="customerEmail"
              name="customerEmail"
              placeholder="Insert email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerPhone">Phone</label>
            <input
              type="number"
              id="customerPhone"
              name="customerPhone"
              placeholder="Insert phone"
              onChange={handleChange}
            />
          </div>
          <button>Add Customer</button>
        </form>
      </div>
    </main>
  )
}