import { Link } from 'react-router-dom'
import { CustomerRow } from './CustomerRow'
import './Customers.css'
import { useAppSelector } from '../../../hooks/store'
import { useCustomerActions } from '../../../store/customers/hooks/useCustomerActions'
import { useEffect } from 'react'

export const Customers = () => {
  useEffect(() => {
    document.title = 'Clientes - Sales Control';
  }, []); 

  const customers = useAppSelector((state => state.customers))
  const { deleteCustomer } = useCustomerActions()

  const handleDeleteCustomer = (e: React.MouseEvent<HTMLElement>) => {
    deleteCustomer(parseInt(e.currentTarget.id))
  }

  return (
    <main className='main-customers'>
      <header className='header-customers'>
        <div className="title-with-back">
          <Link className="close-link" to="/" aria-label="Volver">
            <i className="bi bi-arrow-left"></i>
          </Link>
          <div>
            <h1>Clientes</h1>
            <p className="page-kicker">{customers.length} registrados</p>
          </div>
        </div>
        <Link className="add-action" to='/addCustomer'>
          <button>
            <i className="bi bi-person-plus"></i>
            Agregar cliente
          </button>
        </Link>
      </header>
      <div className='table-customers'>
        {customers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className='column-number'>N°</th>
              <th className='column-name'>Nombre</th>
              <th className='column-email'>Email</th>
              <th className='column-phone'>Teléfono</th>
              <th className='column-total-orders'>Pedidos</th>
              <th className='column-actions'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map( c => (
              <CustomerRow customer={c} handleDeleteCustomer={handleDeleteCustomer} key={c.id}/>
            ))}
          </tbody>
        </table>
        ) : (
          <div className="empty-state card" style={{width: 'min(1100px, 100%)'}}>
            <i className="bi bi-people"></i>
            <h2>Todavía no hay clientes</h2>
            <p>Agregá el primero para poder asociarlo a las ventas.</p>
          </div>
        )}
      </div>
    </main>
  )
}
