import React from 'react'
import { Link } from 'react-router-dom'
import '../Customer/CustomerRow.css'

interface Props {
  product: InventoryProduct,
  handleDeleteProduct: (e: React.MouseEvent<HTMLElement>) => void
}

export const ProductRowInventory: React.FC<Props> = ({product, handleDeleteProduct}) => {
  const lowStock = product.stock <= 5;

  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>
        <div className="name-cell">
          <span className="avatar"><i className="bi bi-box"></i></span>
          {product.name}
        </div>
      </td>
      <td>${Number(product.unitPrice).toFixed(2)}</td>
      <td>
        <span className={`badge ${lowStock ? 'badge-warn' : 'badge-ok'}`}>{product.stock}</span>
      </td>
      <td>{product.category}</td>
      <td>{product.expire ? product.expire : '-'}</td>
      <td className='td-actions'>
        <Link to={`/editInventoryItem/${product.id}`} aria-label="Editar producto">
          <i id={product.id.toString()} className="bi bi-pencil-square"></i>
        </Link>
        <button type="button" className="icon-danger" onClick={handleDeleteProduct} id={product.id.toString()} aria-label="Eliminar producto">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  )
}
