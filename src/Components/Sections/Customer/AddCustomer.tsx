import { useEffect, useState } from 'react'
import '../../../styles/Input.css'
import './AddCustomer.css'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'
import { Link } from 'react-router-dom'
import { REQUIRED_FORM_MESSAGE, fieldClass, isBlank, isValidEmail } from '../../../utils/formValidation'

export const AddCustomer = () => {
  const { addCustomer } = useCustomerActions();

  const [customerInfo, setCustomerInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [customerData, setCustomerData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });
  const [fieldErrors, setFieldErrors] = useState({
    customerName: false,
    customerEmail: false,
    customerPhone: false,
  });

  useEffect(() => {
    document.title = 'Add Customer - Sales Control';
  }, []); 

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = customerData.customerName.trim();
    const email = customerData.customerEmail.trim();
    const phone = customerData.customerPhone.trim();
    const errors = {
      customerName: isBlank(name),
      customerEmail: isBlank(email) || !isValidEmail(email),
      customerPhone: isBlank(phone),
    };

    setFieldErrors(errors);
    setCustomerInfo("");

    if (errors.customerName || errors.customerPhone || isBlank(email)) {
      setErrorInfo(REQUIRED_FORM_MESSAGE);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorInfo('Ingresá un email válido.');
      return;
    }

    setErrorInfo("");
    setCustomerInfo(`Cliente ${name} agregado`);
    addCustomer({name, email, phone});
    setCustomerData({ customerName: '', customerPhone: '', customerEmail: '' });
    setFieldErrors({ customerName: false, customerEmail: false, customerPhone: false });
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
        <h1>Nuevo cliente</h1>
        <form onSubmit={handleAddCustomer} action="" noValidate>
          <div>
            <label htmlFor="customerName">Nombre*</label>
            <input 
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Jorge Lopez"
              value={customerData.customerName}
              className={fieldClass(fieldErrors.customerName)}
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
              value={customerData.customerEmail}
              className={fieldClass(fieldErrors.customerEmail)}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="customerPhone">Teléfono*</label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              placeholder="Insert phone"
              value={customerData.customerPhone}
              className={fieldClass(fieldErrors.customerPhone)}
              onChange={handleChange}
            />
          </div>
          {customerInfo && <p className='formsent'>{customerInfo}</p>}
          {errorInfo && <p className='dataerror'>{errorInfo}</p>}
          <button><i className="bi bi-person-plus"></i> Guardar cliente</button>
        </form>
      </div>
    </main>
  )
}
