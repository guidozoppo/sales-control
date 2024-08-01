import { useEffect, useState } from "react"
import './CreateProduct.css'
import { useProductActions } from "../../store/products/hooks/useProductActions";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";

export const CreateProduct = () => {
  useEffect(() => {
    document.title = 'Load Product - Sales Control';
  }, []); 

  const initialValues: InventoryProduct = {
    id: 1,
    name: "",
    stock: 0,
    unitPrice: 0,
    expire: null,
    category: ""
  };

  const categories = useAppSelector((state) => state.categories)
  const [values, setValues] = useState(initialValues)
  const [dateError, setDateError] = useState('')
  const [productInfo, setProductInfo] = useState('')
  const { addProduct } = useProductActions() 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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

    if (values.expire != null && new Date(values.expire) < new Date()) {
      setDateError("Estás cargando un producto vencido.")
      return;
    }

    setProductInfo(`Producto ${values.name} cargado`)
    addProduct(values)
    setValues(initialValues);
    setDateError(''); 
  }

  return (
    <main className="main-loadProduct">
      <div className="container-loadProduct">
        <h1>Create Product</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="Manzana"
              value={values.name}
              onChange={handleChange}
              />
          </div>
          <div>
            <label htmlFor="quantity">Stock</label>
            <input 
              type="number" 
              id="quantity"
              name="quantity"
              placeholder="10"
              min={1}
              value={values.stock}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="unitPrice">Price</label>
            <input 
              type="number" 
              id="unitPrice"
              name="unitPrice"
              placeholder="100"
              value={values.unitPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select name="" id="" onChange={handleChange}>
              {categories.map( (category, index) => {
                return(
                  <option 
                    key={index} 
                    value={category.name}
                  >
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <label htmlFor="expire">Expired Date</label>
            <input type="date" 
              id="expire"
              name="expire"
              onChange={handleChange}
            />
          </div>
          {dateError && <p className='dateerror'>{dateError}</p>}
          {productInfo && <p className='formsent'>{productInfo}</p>}
          <button type="submit">Add Product</button>
          <Link to='/createCategory'>
          <button>
            <i className="bi bi-plus"></i>
            Add Category
          </button>
        </Link>
        </form>
      </div>
    </main>
  )
}