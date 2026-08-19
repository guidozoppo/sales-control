import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import { useEffect, useState } from "react";
import { useProductActions } from "../../../store/products/hooks/useProductActions";
import { REQUIRED_FORM_MESSAGE, fieldClass, isBlank } from "../../../utils/formValidation";

export const EditInventoryItem = () => {
  useEffect(() => {
    document.title = 'Edit Product - Sales Control';
  }, []); 

  const { id } = useParams<string>();
  const products = useAppSelector((state) => state.products);
  const { editProduct } = useProductActions() 
  const productToEdit: InventoryProduct = products.find( p => p.id === parseInt(id!))!;
  const categories = useAppSelector((state) => state.categories);
  const [newDataItem, setNewDataItem] = useState(productToEdit);
  const [dataError, setDataError] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    stock: false,
    unitPrice: false,
    category: false,
  });
  
  const handleEditItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, expire, stock, unitPrice, category } = newDataItem;
    const errors = {
      name: isBlank(name),
      stock: isBlank(stock) || Number(stock) < 1,
      unitPrice: isBlank(unitPrice) || Number(unitPrice) <= 0,
      category: isBlank(category),
    };

    setFieldErrors(errors);
    setProductInfo('');

    if (errors.name || errors.stock || errors.unitPrice || errors.category) {
      setDataError(REQUIRED_FORM_MESSAGE);
      return;
    }

    if (expire != null && expire !== '' && new Date(expire) < new Date()) {
      setDataError("La fecha de vencimiento ya pasó.");
      return;
    }

    if ( productToEdit.name === name &&
         productToEdit.expire === expire &&
         Number(productToEdit.stock) === Number(stock) &&
         Number(productToEdit.unitPrice) === Number(unitPrice) &&
         productToEdit.category === category
        ) {
     setDataError("No hay cambios para guardar.");
     return;
   }

    setProductInfo(`Producto ${name} actualizado`);
    editProduct(newDataItem);
    setDataError(''); 
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...newDataItem,
      [name]: value
    }

    setNewDataItem(newValues);
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  }

  return (
    <main className="main-container">
      <div className="form-base">
        <div className='close-button'>
          <Link to="/inventory" aria-label="Cerrar">
            <i className="bi bi-x-lg"></i>
          </Link>
        </div>
        <h1>Editar {productToEdit?.name}</h1>
        <form action="" onSubmit={handleEditItem} noValidate>
          <div>
            <label htmlFor="name">Producto *</label>
            <input
              type="text" 
              id="name"
              name="name"
              placeholder="Manzana"
              value={newDataItem?.name}
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
              value={newDataItem?.stock}
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
              value={newDataItem?.unitPrice}
              className={fieldClass(fieldErrors.unitPrice)}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Categoría *</label>
            <select 
              name="category"
              id="category"
              value={newDataItem.category || ''} 
              className={fieldClass(fieldErrors.category)}
              onChange={handleChange}>
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
            <input 
              type="date"
              id="expire"
              name="expire"
              value={newDataItem.expire ? newDataItem.expire : ""}
              onChange={handleChange}
            />
          </div>
          {dataError && <p className='dataerror'>{dataError}</p>}
          {productInfo && <p className='formsent'>{productInfo}</p>}
          <div className="buttons-container">
            <button type="submit"><i className="bi bi-check2"></i> Guardar</button>
            <Link to='/inventory'>
              <button type="button" className="btn-secondary">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )

}
