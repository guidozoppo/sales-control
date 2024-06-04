import { useState } from "react"
import './LoadProduct.css'

export const LoadProduct = () => {
  const initialValues = {
    productName: "",
    stock: "",
    price: "",
    expiredDate: ""
  };

  const [values, setValues] = useState(initialValues)
  const [dateError, setDateError] = useState('')
  const [productInfo, setProductInfo] = useState('')

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

    if (new Date(values.expiredDate) < new Date()) {
      setDateError("Estás cargando un producto vencido.")
      return;
    }

    setProductInfo(`Producto ${values.productName} cargado`)
    setValues(initialValues);
    setDateError('');
  }

  return (
    <main className="main-loadProduct">
      <h1>Load Product</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product</label>
          <input 
            type="text" 
            id="productName"
            name="productName"
            placeholder="Manzana"
            value={values.productName}
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input 
            type="number" 
            id="stock"
            name="stock"
            placeholder="10"
            min={1}
            value={values.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            id="price"
            name="price"
            placeholder="100"
            min={0.1}
            value={values.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="expiredDate">Expired Date</label>
          <input type="date" 
            id="expiredDate"
            name="expiredDate"
            value={values.expiredDate}
            onChange={handleChange}
          />
        </div>
        {dateError && <p className='dateerror'>{dateError}</p>}
        {productInfo && <p className='formsent'>{productInfo}</p>}
        <button type="submit">Add Product</button>
      </form>
    </main>
  )
}