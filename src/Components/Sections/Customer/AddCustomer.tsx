import { useEffect, useState } from 'react'
import '../../../styles/Input.css'
import './AddCustomer.css'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'
import { Link } from 'react-router-dom'

export const AddCustomer = () => {
  const { addCustomer } = useCustomerActions();

  const [customerInfo, setCustomerInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [customerData, setCustomerData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  useEffect(() => {
    document.title = 'Add Customer - Sales Control';
  }, []); 

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = customerData.customerName;
    const email = customerData.customerEmail;
    const phone = customerData.customerPhone;
    // Verificar que no haya inputs vacios
    if (name === '' && email === '' && phone === '') {
      setErrorInfo('Error. Some field is empty.');
      return;
    }

    // Verificar que name no esté cargado ya
    // Verificar que email no esté cargado ya
    setCustomerInfo(`Customer ${name} added`);
    addCustomer({name, email, phone});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;

    const newCustomer = {
      ...customerData,
      [name]: value
    };

    setCustomerData(newCustomer);
  };

  return (
    <main className='main-container'>
      <div className='form-base'>
        <div className='close-button'>
          <Link to="/">
            x
          </Link>
        </div>
        <h1>Add new customer</h1>
        <form onSubmit={handleAddCustomer} action="">
          <div>
            <label htmlFor="customerName">Name*</label>
            <input 
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Jorge Lopez"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerEmail">Email*</label>
            <input 
              type="email"
              id="customerEmail"
              name="customerEmail"
              placeholder="Insert email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerPhone">Phone*</label>
            <input
              type="number"
              id="customerPhone"
              name="customerPhone"
              placeholder="Insert phone"
              onChange={handleChange}
            />
          </div>
          {customerInfo && <p className='formsent'>{customerInfo}</p>}
          {errorInfo && <p className='dateerror'>{errorInfo}</p>}
          <button>Add Customer</button>
        </form>
      </div>
    </main>
  )
}