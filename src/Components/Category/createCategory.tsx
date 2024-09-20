import { useEffect, useState } from "react"
import { useCategoryActions } from "../../store/categories/hooks/useCategoryActions";
import { Link } from "react-router-dom";

export const CreateCategory = () => {
  useEffect(() => {
    document.title = 'Create Category - Sales Control';
  }, []); 

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
    <main className="main-container">
      <div className="form-base">
        <div className='close-button'>
          <Link to="/">
            x
          </Link>
        </div>
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