import { Link } from 'react-router-dom'
import { CustomerRow } from './CustomerRow'
import './Customers.css'
import { useAppSelector } from '../../../hooks/store'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'

export const Customers = () => {
  const customers = useAppSelector((state => state.customers))
  const { deleteCustomer } = useCustomerActions()

  const handleDeleteCustomer = (e: React.MouseEvent<HTMLElement>) => {
    deleteCustomer(parseInt(e.currentTarget.id))
  }

  return (
    <main className='main-customers'>
      <header className='header-customers'>
        <h1>Customers</h1>
        <Link to='/addCustomer'>
          <button>
            <i className="bi bi-plus"></i>
            Add Customer
          </button>
        </Link>
      </header>
      <div className='table-customers'>
        <table>
          <thead>
            <tr>
              <th className='column-number'>N°</th>
              <th className='column-name'>Name</th>
              <th className='column-email'>Email</th>
              <th className='column-phone'>Phone</th>
              <th className='column-total-orders'>Total Orders</th>
              <th className='column-actions'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map( c => (
              <CustomerRow customer={c} handleDeleteCustomer={handleDeleteCustomer} key={c.id}/>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}