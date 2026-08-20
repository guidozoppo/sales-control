import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/store";

interface Props {
  index: number,
  product: SaleProduct,
  handleProductChange: (index: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, unitPrice: number) => void
  setProductError: (index: number, hasError: boolean) => void,
  highlightEmpty?: boolean,
}

export const ProductRow: React.FC<Props> = ({ index, product, handleProductChange, setProductError, highlightEmpty}) => {
  const inventory = useAppSelector((state) => state.products);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState<number | undefined>(product.unitPrice);
  const [inputClass, setInputClass] = useState(false);

  useEffect( ()=> {
    const foundProduct = inventory.find((pi) => pi.name === productName);
    setProductPrice(foundProduct?.unitPrice);
  }, [productName, inventory])

  useEffect( () => {
    //Se hace esto para poder actualizar tambien el valor del unitPrice.
    if(productName) {
      handleProductChange(index, { target: { name: 'name', value: productName } } as React.ChangeEvent<HTMLSelectElement>, productPrice ? productPrice : 0);
    }
  }, [productPrice])

  useEffect(() => {
    // Resetear los valores al inicializar
    setProductName(product.name);
    setProductQuantity(product.quantity);
    setProductPrice(product.unitPrice);
  }, [product.quantity, product.unitPrice, product.quantity]);

  const validateQuantity = (name: string, quantity: number) => {
    const productToCheck = inventory.find((pi) => pi.name.toLowerCase() === name.toLowerCase());
    if (productToCheck && (productToCheck.stock < quantity || quantity == 0 || Number.isNaN(quantity))) {
      setInputClass(true);
      setProductError(index, true);
    } else {
      setInputClass(false);
      setProductError(index, false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);
    setProductQuantity(quantity);
    handleProductChange(index, e, productPrice ? productPrice : 0);
    validateQuantity(productName, quantity);
  }
  
  const handleProductNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newName = e.target.value;
    setProductName(newName);
    validateQuantity(newName, productQuantity);
  }
  
  return (
    <div className="product-row">
      <div>
          <label htmlFor={`productName-${index}`}>Producto</label>
          <select 
            value={productName || ''}
            name="name"
            id={`productName-${index}`}
            className={highlightEmpty && !productName ? 'inputError' : undefined}
            onChange={(e) => handleProductNameChange(e)}
            autoComplete="off"
          >
            <option value="" disabled>Elegí un producto</option>
            {inventory.map((product, index) => {
              return (
                <option key={index} value={product.name}>{product.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor={`quantity-${index}`}>Cantidad</label>
          <input
            disabled={productName === ''}
            title="Disabled because you have to select a product"
            type="number" 
            id={`quantity-${index}`}
            name="quantity"
            placeholder="10"
            min={1}
            value={product.quantity}
            onChange={(e) => handleQuantityChange(e)}
            style={inputClass ? {border: '1px solid red', outline:'1px solid red'}: {}}
          />
        </div>
        <div>
          <label htmlFor={`unitPrice-${index}`}>Precio unitario</label>
          <input
            readOnly
            type="number" 
            id={`unitPrice-${index}`}
            name="unitPrice"
            placeholder="100"
            value={productPrice || 0}
            /* onChange={(e) => handleProductChange(index, e)} */
            />
        </div>
    </div>
  )
}