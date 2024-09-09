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
  const [newDataItem, setNewDataItem] = useState(productToEdit);
  const [dataError, setDataError] = useState('');
  const [productInfo, setProductInfo] = useState('');
  
  const handleEditItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, expire, stock, unitPrice, category } = newDataItem;

    if (expire != null && new Date(expire) < new Date()) {
      setDataError("Expire date is expired.");
      setProductInfo('');
      return;
    }

    if (name === '' || stock.toString() === '' || 
        unitPrice.toString() === '' || category === '' || expire === '') {
      setDataError('Error. Some field is empty.');
      setProductInfo('');
      return;
    }

    if ( productToEdit.name === name &&
         productToEdit.expire === expire &&
         productToEdit.stock === stock &&
         productToEdit.unitPrice === unitPrice &&
         productToEdit.category === category
        ) {
     setDataError("Error to edit. All fields have same values that previously");
     setProductInfo('');
     return;
   }
    
    if (unitPrice < 0 || stock < 0) {
      setDataError('Price or stock are negative.');
      setProductInfo('');
      return;
    }

    setProductInfo(`Product ${name} edited`);
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
  }

  return (
    <main className="main-container">
      <div className="form-base">
        <h1>Edit Product {productToEdit?.name}</h1>
        <form action="" onSubmit={handleEditItem}>
          <div>
            <label htmlFor="name">Product</label>
            <input
              type="text" 
              id="name"
              name="name"
              placeholder="Manzana"
              value={newDataItem?.name}
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
              value={newDataItem?.stock}
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
              value={newDataItem?.unitPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select 
              name="category" 
              value={newDataItem.category || categories[0].name} 
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
              value={newDataItem.expire ? newDataItem.expire : ""}
              onChange={handleChange}
            />
          </div>
          {dataError && <p className='dataerror'>{dataError}</p>}
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