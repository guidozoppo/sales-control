import { useAppSelector } from "../../hooks/store";

interface Props {
  index: number,
  product: SaleProduct,
  handleProductChange: (index: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export const ProductRow: React.FC<Props> = ({ index, product, handleProductChange}) => {
  const inventory = useAppSelector((state) => state.products);
  return (
    <div className="product row" style={{ display: 'flex'}}>
      <div>
          <label htmlFor={`productName-${index}`}>Product</label>
          <select name="" id="" onChange={(e) => handleProductChange(index, e)}>
            {inventory.map((product, index) => {
              return (
                <option key={index} value={product.id}>{product.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor={`quantity-${index}`}>Quantity</label>
          <input 
            type="number" 
            id={`quantity-${index}`}
            name="quantity"
            placeholder="10"
            min={1}
            value={product.quantity}
            onChange={(e) => handleProductChange(index, e)}
            />
        </div>
        <div>
          <label htmlFor={`unitPrice-${index}`}>Unit Price</label>
          <input
            /* readOnly */
            type="number" 
            id={`unitPrice-${index}`}
            name="unitPrice"
            placeholder="100"
            value={product.unitPrice}
            onChange={(e) => handleProductChange(index, e)}
            />
        </div>
    </div>
  )
}