import { useState } from "react"
import { useCategoryActions } from "../../store/categories/hooks/useCategoryActions";

export const CreateCategory = () => {

  const initialValues: Category = {
    name: "",
  };

  const [values, setValues] = useState(initialValues);
  const [productInfo, setProductInfo] = useState('');
  const [errorInfo, setErrorInfo] = useState('');
  const { addCategory } = useCategoryActions()

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
    e.preventDefault();

    if(values.name === '') {
      setErrorInfo(`Name is required`);
      return;
    }
    setProductInfo(`Category ${values.name} added`);
    addCategory(values);
    setValues(initialValues);
  }

  return (
    <main className="main-loadProduct">
      <div className="container-loadProduct">
        <h1>Create Category</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Category Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="Frutas"
              value={values.name}
              onChange={handleChange}
              />
          </div>
          {productInfo && <p className='formsent'>{productInfo}</p>}
          {errorInfo && <p className='dataerror'>{errorInfo}</p>}
          <button type="submit">Add Category</button>
        </form>
      </div>
    </main>
  )
}