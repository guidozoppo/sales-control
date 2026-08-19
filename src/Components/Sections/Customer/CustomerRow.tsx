import React from 'react'
import { Link } from 'react-router-dom'
import './CustomerRow.css'

interface Props {
  customer: CustomerWithID,
  handleDeleteCustomer: (e: React.MouseEvent<HTMLElement>) => void
}

export const CustomerRow: React.FC<Props> = ({customer, handleDeleteCustomer}) => {
  return (
    <tr key={customer.id}>
      <td>{customer.id}</td>
      <td>
        <div className="name-cell">
          <span className="avatar">{customer.name.slice(0, 1).toUpperCase()}</span>
          {customer.name}
        </div>
      </td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      <td><span className="badge badge-muted">0</span></td>
      <td className='td-actions'>
        <Link to={`/editCustomer/${customer.id}`} aria-label="Editar cliente">
          <i id={customer.id.toString()} className="bi bi-pencil-square"></i>
        </Link>
        <button type="button" className="icon-danger" onClick={handleDeleteCustomer} id={customer.id.toString()} aria-label="Eliminar cliente">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  )
}
