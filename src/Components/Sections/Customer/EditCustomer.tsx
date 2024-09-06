import { useEffect, useState } from 'react'
import '../../../styles/Input.css'
import './AddCustomer.css'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/store'

export const EditCustomer = () => {
  const { id } = useParams();
  const customers = useAppSelector((state) => state.customers);
  const customerToEdit: CustomerWithID = customers.find( c => c.id === parseInt(id!))!;
  const { editCustomer } = useCustomerActions();
  const [customerData, setCustomerData] = useState(customerToEdit);
  const [customerInfo, setCustomerInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  
  useEffect(() => {
    document.title = 'Edit Customer - Sales Control';
  }, []); 

  const handleEditCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = customerData.name;
    const email = customerData.email;
    const phone = customerData.phone;
    // Verificar que no haya inputs vacios
    if (name === '' && email === '' && phone === '') {
      setErrorInfo('Error. Some field is empty.');
      return;
    }

    if(customerToEdit.name === customerData.name &&
       customerToEdit.email === customerData.email &&
         customerToEdit.phone === customerData.phone) {
      setErrorInfo("Error to edit. All fields have same values that previously");
      return;
    }
    
    // Verificar que el nuevo nombre no esté cargado ya
    
    setCustomerInfo(`Customer ${name} added`);
    
    editCustomer({name, phone, email, id: customerData.id});
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
        <h1>Edit customer {customerToEdit.name}</h1>
        <form onSubmit={handleEditCustomer} action="">
          <div>
            <label htmlFor="customerName">Name*</label>
            <input 
              type="text"
              id="customerName"
              name="name"
              placeholder="Jorge Lopez"
              value={customerData?.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerEmail">Email*</label>
            <input 
              type="email"
              id="customerEmail"
              name="email"
              placeholder="Insert email"
              value={customerData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerPhone">Phone*</label>
            <input
              type="number"
              id="customerPhone"
              name="phone"
              placeholder="Insert phone"
              value={customerData.phone}
              onChange={handleChange}
            />
          </div>
          {customerInfo && <p className='formsent'>{customerInfo}</p>}
          {errorInfo && <p className='dataerror'>{errorInfo}</p>}
          <button>Edit Customer</button>
          <Link to="/customers">
            <button>Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  )
}