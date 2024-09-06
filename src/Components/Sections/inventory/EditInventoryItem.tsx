import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import { useState } from "react";
import { useProductActions } from "../../../store/products/hooks/useProductActions";

export const EditInventoryItem = () => {
  const { id } = useParams<string>();
  const products = useAppSelector((state) => state.products);
  const { editProduct } = useProductActions() 
  const productToEdit: InventoryProduct = products.find( p => p.id === parseInt(id!))!;
  const categories = useAppSelector((state) => state.categories);
  const [values, setValues] = useState(productToEdit);
  const [dateError, setDateError] = useState('');
  const [productInfo, setProductInfo] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.expire != null && new Date(values.expire) < new Date()) {
      setDateError("Expire date is expired.");
      return;
    }

    setProductInfo(`Product ${values.name} edited`);
    editProduct(values);
    setDateError(''); 
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value
    }

    setValues(newValues);
  }

  return (
    <main className="main-container">
      <div className="form-base">
        <h1>Edit Product {productToEdit?.name}</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product</label>
            <input
              type="text" 
              id="name"
              name="name"
              placeholder="Manzana"
              value={values?.name}
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
              value={values?.stock}
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
              value={values?.unitPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select 
              name="category" 
              value={values.category || categories[0].name} 
              onChange={handleChange}>
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
            <input 
              type="date"
              id="expire"
              name="expire"
              value={values.expire ? values.expire : ""}
              onChange={handleChange}
            />
          </div>
          {dateError && <p className='dataerror'>{dateError}</p>}
          {productInfo && <p className='formsent'>{productInfo}</p>}
          <div className="buttons-container">
            <button type="submit">Edit Product</button>
            <Link to='/inventory'>
              <button>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )

}