import { useEffect, useState } from "react"
import './CreateProduct.css'
import { useProductActions } from "../../store/products/hooks/useProductActions";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { REQUIRED_FORM_MESSAGE, fieldClass, isBlank } from "../../utils/formValidation";

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
  const [fieldErrors, setFieldErrors] = useState({ name: false, stock: false, unitPrice: false, category: false })
  const { addProduct } = useProductActions() 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e
    const { name, value } = target
    const newValues = {
      ...values,
      [name]: value
    }

    setValues(newValues)
    setFieldErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProductInfo('')

    const errors = {
      name: isBlank(values.name),
      stock: isBlank(values.stock) || Number(values.stock) < 1,
      unitPrice: isBlank(values.unitPrice) || Number(values.unitPrice) <= 0,
      category: isBlank(values.category),
    };

    setFieldErrors(errors);

    if (errors.name || errors.stock || errors.unitPrice || errors.category) {
      setDateError(REQUIRED_FORM_MESSAGE);
      return;
    }

    if (values.expire != null && values.expire !== '' && new Date(values.expire) < new Date()) {
      setDateError("Estás cargando un producto vencido.")
      return;
    }

    setProductInfo(`Producto ${values.name} cargado`)
    addProduct(values)
    setValues(initialValues);
    setDateError(''); 
    setFieldErrors({ name: false, stock: false, unitPrice: false, category: false });
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
        <form action="" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Producto *</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="Manzana"
              value={values.name}
              className={fieldClass(fieldErrors.name)}
              onChange={handleChange}
              />
          </div>
          <div>
            <label htmlFor="stock">Stock *</label>
            <input 
              type="number" 
              id="stock"
              name="stock"
              placeholder="10"
              min={1}
              value={values.stock || ''}
              className={fieldClass(fieldErrors.stock)}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="unitPrice">Precio *</label>
            <input 
              type="number" 
              id="unitPrice"
              name="unitPrice"
              placeholder="100"
              min={0.01}
              step="0.01"
              value={values.unitPrice || ''}
              className={fieldClass(fieldErrors.unitPrice)}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Categoría *</label>
            <select
              name="category"
              id="category"
              value={values.category}
              className={fieldClass(fieldErrors.category)}
              onChange={handleChange}
            >
              <option value="" disabled>Elegí una categoría</option>
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
