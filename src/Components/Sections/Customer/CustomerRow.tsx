import './CustomerRow.css'

interface Props {
  customer: CustomerWithID,
  handleEditCustomer: (e: React.MouseEvent<HTMLElement>) => void,
  handleDeleteCustomer: (e: React.MouseEvent<HTMLElement>) => void
}

export const CustomerRow: React.FC<Props> = ({customer, handleEditCustomer, handleDeleteCustomer}) => {
  return (
    <tr key={customer.id}>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      {/* <td>{customer.totalOrders}</td> */}
      <td>0</td>
      <td className='td-actions'>
        <i onClick={handleEditCustomer} id={customer.id.toString()} className="bi bi-pencil-square"></i>
        <i onClick={handleDeleteCustomer} id={customer.id.toString()} className="bi bi-trash"></i>
      </td>
    </tr>
  )
}