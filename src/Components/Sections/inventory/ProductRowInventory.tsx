import '../Customer/CustomerRow.css'

interface Props {
  product: InventoryProduct,
  handleEditProduct: (e: React.MouseEvent<HTMLElement>) => void,
  handleDeleteProduct: (e: React.MouseEvent<HTMLElement>) => void
}

export const ProductRowInventory: React.FC<Props> = ({product, handleEditProduct, handleDeleteProduct}) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.unitPrice}</td>
      <td>{product.stock}</td>
      <td>{product.category}</td>
      {<td>{product.expire ? product.expire : '-'}</td>}
      <td className='td-actions'>
        <i onClick={handleEditProduct} id={product.id.toString()} className="bi bi-pencil-square"></i>
        <i onClick={handleDeleteProduct} id={product.id.toString()} className="bi bi-trash"></i>
      </td>
    </tr>
  )
}