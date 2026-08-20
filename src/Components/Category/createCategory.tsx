import { useEffect, useState } from "react"
import { useCategoryActions } from "../../store/categories/hooks/useCategoryActions";
import { Link } from "react-router-dom";
import { REQUIRED_FORM_MESSAGE, fieldClass, isBlank } from "../../utils/formValidation";

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
  const [nameError, setNameError] = useState(false);
  const { addCategory } = useCategoryActions()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const { name, value } = target
    
    const newValues = {
      ...values,
      [name]: value
    }

    setValues(newValues)
    setNameError(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProductInfo('');

    if (isBlank(values.name)) {
      setNameError(true);
      setErrorInfo(REQUIRED_FORM_MESSAGE);
      return;
    }

    setErrorInfo('');
    setProductInfo(`Categoría ${values.name} agregada`);
    addCategory(values);
    setValues(initialValues);
    setNameError(false);
  }

  return (
    <main className="main-container">
      <div className="form-base">
        <div className='close-button'>
          <Link to="/createProduct" aria-label="Cerrar">
            <i className="bi bi-x-lg"></i>
          </Link>
        </div>
        <h1>Nueva categoría</h1>
        <form action="" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Nombre *</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="Frutas"
              value={values.name}
              className={fieldClass(nameError)}
              onChange={handleChange}
              />
          </div>
          {productInfo && <p className='formsent'>{productInfo}</p>}
          {errorInfo && <p className='dataerror'>{errorInfo}</p>}
          <button type="submit"><i className="bi bi-check2"></i> Guardar categoría</button>
        </form>
      </div>
    </main>
  )
}
