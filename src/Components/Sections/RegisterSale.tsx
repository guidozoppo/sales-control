import { useState } from "react"
import './RegisterSale.css'
import { ProductRow } from "./ProductRow";

export const RegisterSale = () => {
  const initialValues = {
    customerName: "",
    productName: "",
    quantity: 0,
    unitPrice: 0,
    saleDate: ""
  };

  const [values, setValues] = useState(initialValues)
  const [dateError, setDateError] = useState('')
  const [productInfo, setProductInfo] = useState('')
  
  const [products, setProducts] = useState([
    { productName: '', quantity: 0, unitPrice: 0 },
    { productName: '', quantity: 0, unitPrice: 0 },
    { productName: '', quantity: 0, unitPrice: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const { name, value } = target
    
    const newValues = {
      ...values,
      [name]: value
    }

    setValues(newValues)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(products)
    /* if (new Date(values.saleDate) < new Date()) {
      setDateError("Estás cargando un producto vencido.")
      return;
    }

    setProductInfo(`Producto ${values.productName} cargado`)
    setValues(initialValues);
    setDateError(''); */
  }

  const handleProductChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: name === 'quantity' || name === 'unitPrice' ? Number(value) : value,
    };
    setProducts(updatedProducts);
  };

  const addProductRow = () => {
    setProducts([...products, { productName: '', quantity: 0, unitPrice: 0 }]);
  };

  return (
    <main className="main-registerSale">
      <h1>Register a sale</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="data-sale">
          <div>
            <label htmlFor="customerName">Customer</label>
            <input 
              type="text" 
              id="customerName"
              name="customerName"
              placeholder="Jorge Lobos"
              value={values.customerName}
              onChange={handleChange}
              />
          </div>
          <div>
          <label htmlFor="saleDate">Sale Date</label>
          <input type="date" 
            id="saleDate"
            name="saleDate"
            value={values.saleDate}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className="data-products">
          {products.map(( product, index) => (
            <ProductRow 
              key={index}
              index={index}
              product={product}
              handleProductChange={handleProductChange}
            />
          ))}
        </div>
        {dateError && <p className='dateerror'>{dateError}</p>}
        {productInfo && <p className='formsent'>{productInfo}</p>}
        <button type="submit">Register Sale</button>
        <button type="button" onClick={addProductRow}>Agregar Producto</button>
      </form>
    </main>
  )
}