import { Link } from 'react-router-dom'
import '../Customer/CustomerRow.css'

interface Props {
  product: InventoryProduct,
  handleDeleteProduct: (e: React.MouseEvent<HTMLElement>) => void
}

export const ProductRowInventory: React.FC<Props> = ({product, handleDeleteProduct}) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.unitPrice}</td>
      <td>{product.stock}</td>
      <td>{product.category}</td>
      {<td>{product.expire ? product.expire : '-'}</td>}
      <td className='td-actions'>
        <Link to={`/editInventoryItem/${product.id}`} >
          <i id={product.id.toString()} className="bi bi-pencil-square"></i>
        </Link>
        <i onClick={handleDeleteProduct} id={product.id.toString()} className="bi bi-trash"></i>
      </td>
    </tr>
  )
}