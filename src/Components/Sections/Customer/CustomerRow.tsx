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
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      {/* <td>{customer.totalOrders}</td> */}
      <td>0</td>
      <td className='td-actions'>
        <Link to={`/editCustomer/${customer.id}`}>
          <i id={customer.id.toString()} className="bi bi-pencil-square"></i>
        </Link>
        <i onClick={handleDeleteCustomer} id={customer.id.toString()} className="bi bi-trash"></i>
      </td>
    </tr>
  )
}