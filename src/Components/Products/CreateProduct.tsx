import { useEffect, useState } from "react"
import './CreateProduct.css'
import { useProductActions } from "../../store/products/hooks/useProductActions";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";

export const CreateProduct = () => {
  useEffect(() => {
    document.title = 'Create Product - Sales Control';
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
    <main className="main-container">
      <div className="form-base">
        <div className='close-button'>
          <Link to="/inventory" aria-label="Cerrar">
            <i className="bi bi-x-lg"></i>
          </Link>
        </div>
        <h1>Nuevo producto</h1>
        <p className="form-subtitle">Completá stock, precio y categoría</p>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Producto</label>
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
            <label htmlFor="category">Categoría</label>
            <select name="category" id="" onChange={handleChange}>
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
            <label htmlFor="expire">Vencimiento</label>
            <input type="date" 
              id="expire"
              name="expire"
              onChange={handleChange}
            />
          </div>
          {dateError && <p className='dataerror'>{dateError}</p>}
          {productInfo && <p className='formsent'>{productInfo}</p>}
          <div className="buttons-container">
            <button type="submit"><i className="bi bi-check2"></i> Guardar</button>
            <Link to='/createCategory'>
              <button type="button" className="btn-secondary">
                <i className="bi bi-tags"></i> Categoría
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}