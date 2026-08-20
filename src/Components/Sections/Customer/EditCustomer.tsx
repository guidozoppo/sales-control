import { useEffect, useState } from 'react'
import '../../../styles/Input.css'
import './AddCustomer.css'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/store'
import { REQUIRED_FORM_MESSAGE, fieldClass, isBlank, isValidEmail } from '../../../utils/formValidation'

export const EditCustomer = () => {
  const { id } = useParams();
  const customers = useAppSelector((state) => state.customers);
  const customerToEdit: CustomerWithID = customers.find( c => c.id === parseInt(id!))!;
  const { editCustomer } = useCustomerActions();
  const [customerData, setCustomerData] = useState(customerToEdit);
  const [customerInfo, setCustomerInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ name: false, email: false, phone: false });
  
  useEffect(() => {
    document.title = 'Edit Customer - Sales Control';
  }, []); 

  const handleEditCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = customerData.name.trim();
    const email = customerData.email.trim();
    const phone = String(customerData.phone).trim();
    const errors = {
      name: isBlank(name),
      email: isBlank(email) || !isValidEmail(email),
      phone: isBlank(phone),
    };

    setFieldErrors(errors);
    setCustomerInfo("");

    if (errors.name || errors.phone || isBlank(email)) {
      setErrorInfo(REQUIRED_FORM_MESSAGE);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorInfo('Ingresá un email válido.');
      return;
    }

    if(customerToEdit.name === name &&
       customerToEdit.email === email &&
         String(customerToEdit.phone) === phone) {
      setErrorInfo("No hay cambios para guardar.");
      return;
    }
    
    setErrorInfo("");
    setCustomerInfo(`Cliente ${name} actualizado`);
    
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
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <main className='main-container'>
      <div className='form-base'>
        <div className='close-button'>
          <Link to="/customers" aria-label="Cerrar">
            <i className="bi bi-x-lg"></i>
          </Link>
        </div>
        <h1>Editar {customerToEdit.name}</h1>
        <form onSubmit={handleEditCustomer} action="" noValidate>
          <div>
            <label htmlFor="customerName">Nombre*</label>
            <input 
              type="text"
              id="customerName"
              name="name"
              placeholder="Jorge Lopez"
              value={customerData?.name}
              className={fieldClass(fieldErrors.name)}
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
              className={fieldClass(fieldErrors.email)}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerPhone">Teléfono*</label>
            <input
              type="tel"
              id="customerPhone"
              name="phone"
              placeholder="Insert phone"
              value={customerData.phone}
              className={fieldClass(fieldErrors.phone)}
              onChange={handleChange}
            />
          </div>
          {customerInfo && <p className='formsent'>{customerInfo}</p>}
          {errorInfo && <p className='dataerror'>{errorInfo}</p>}
          <button><i className="bi bi-check2"></i> Guardar cambios</button>
          <Link to="/customers">
            <button type="button" className="btn-secondary">Cancelar</button>
          </Link>
        </form>
      </div>
    </main>
  )
}
