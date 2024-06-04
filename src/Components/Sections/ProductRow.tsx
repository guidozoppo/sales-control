interface Props {
  index: number,
  product: Product,
  handleProductChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProductRow: React.FC<Props> = ({ index, product, handleProductChange}) => {
  return (
    <div className="product row" style={{ display: 'flex'}}>
      <div>
          <label htmlFor="productName">Product</label>
          <input 
            type="text" 
            id="productName"
            name="productName"
            placeholder="Manzana"
            value={product.productName}
            onChange={(e) => handleProductChange(index, e)}
            />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input 
            type="number" 
            id="quantity"
            name="quantity"
            placeholder="10"
            min={1}
            value={product.quantity}
            onChange={(e) => handleProductChange(index, e)}
            />
        </div>
        <div>
          <label htmlFor="unitPrice">Unit Price</label>
          <input 
            type="number" 
            id="unitPrice"
            name="unitPrice"
            placeholder="100"
            value={product.unitPrice}
            onChange={(e) => handleProductChange(index, e)}
            />
        </div>
    </div>
  )
}