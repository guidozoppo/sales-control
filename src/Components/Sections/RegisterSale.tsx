import '../../styles/Input.css'
import './RegisterSale.css'
import { useEffect, useState } from "react"
import { ProductRow } from "../Products/ProductRow";
import { useAppSelector } from "../../hooks/store";
import { useSaleActions } from "../../store/sales/hooks/useSaleAction";

export const RegisterSale = () => {
  useEffect(() => {
    document.title = 'Register Sale - Sales Control';
  }, []); 

  const currentDate = new Date();

  const initialProducts = [
    { name: '', quantity: 1, unitPrice: 0 },
    { name: '', quantity: 1, unitPrice: 0 },
    { name: '', quantity: 1, unitPrice: 0 },
  ];

  const inventory = useAppSelector((state) => state.products);
  const customers = useAppSelector((state) => state.customers);
  const { registerSale } = useSaleActions();
  const [saleDate, setSaleDate] = useState<Date | string>(currentDate);
  const [dataError, setDataError] = useState('');
  const [saleTotal, setSaleTotal] = useState(0);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const [products, setProducts] = useState<SaleProduct[]>(initialProducts);
  const [productErrors, setProductErrors] = useState<boolean[]>(new Array(products.length).fill(false));

  useEffect(() => {
    //calcula el nuevo total cuando algo de los productos cambia
    let newTotal = 0
    products.forEach( p => {
      const totalProduct = (p.quantity * p.unitPrice)
      newTotal += totalProduct
    })

    setSaleTotal(newTotal)
  }, [products]);

  const setProductError = (index: number, hasError: boolean) => {
    const updatedErrors = [...productErrors];
    updatedErrors[index] = hasError;
    setProductErrors(updatedErrors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const hasErrors = productErrors.some((error) => error);
    
    if (hasErrors) {
      setDataError("There are issues with some product quantities.");
      return;
    } else if (!hasProductSelected()) {
      setDataError("You've to select a product.");
      return;
    }
    else {
      setDataError('Sale registered');
      createSale();
      alert('Sale registered');
      resetForm();
    }
  }
  
  const hasProductSelected = () => products.some( p => p.name !== "");

  const createSale = () => {
    const productIds: number[] = [];

    products.forEach( p => {
      if(p.name) {
        const productFound = inventory.find((pr) => p.name === pr.name) as InventoryProduct;
        productIds.push(productFound?.id);
      }
    })

    if(productIds.length > 0) {
      const sale: Sale = {
        date: formatDate(saleDate),
        customer_id: customerId!,
        products: productIds,
        total: saleTotal
      }

      registerSale(sale);
    }
  }

  const handleProductChange = (
    index: number, 
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    unitPrice: number,
  ) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];

    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: name === 'quantity' /* || name === 'unitPrice' */ ? Number(value) : value, // Si se modifica quantity o unitPrice al value lo hago number, sino ( se modifica el productName) lo dejo como string
      ['unitPrice']: Number(unitPrice),
    };

    setProducts(updatedProducts);
  };

  const addProductRow = () => {
    setProducts([...products, { name: '', quantity: 1, unitPrice: 0 }]);
  };

  const formatDate = (date: Date | string): string => {
    if(typeof date === "object"){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return date;
  };
  
  const resetForm = () => {
    setProducts(initialProducts);
    setProductErrors(new Array(initialProducts.length).fill(false));
    setSaleTotal(0);
    setDataError('');
    setSaleDate(currentDate);
    setCustomerId(null);
  }
  
  return (
    <main className="main-container">
      <div className="container-registerSale">
        <h1>Register a sale</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="data-sale">
            {<div>
              <label htmlFor="customerName">Customer</label>
              <select 
                value={customerId || "Select a customer"}
                id='customerName'
                onChange={(e) => setCustomerId(parseInt(e.target.value))} 
                autoComplete="off"
                >
                  <option disabled>Select a customer</option>
                  {customers.map((customer, index) => {
                    return(
                      <option key={index} value={customer.id}>{customer.name}</option>
                    )
                  })}
              </select>
            </div>}
            <div>
              <label htmlFor="saleDate">Sale Date</label>
              <input 
                type="date" 
                id="saleDate"
                name="saleDate"
                value={formatDate(saleDate)}
                onChange={(e) => setSaleDate(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="data-products">
            {products.map(( product, index) => (
              <ProductRow 
                key={index}
                index={index}
                product={product}
                handleProductChange={handleProductChange}
                setProductError={setProductError}
              />
            ))}
          </div>
          {dataError && <p className='dataerror'>{dataError}</p>}
          <p>TOTAL: ${saleTotal}</p>
          <div className="buttons-container">
            <button type="submit">Register Sale</button>
            <button type="button" onClick={addProductRow}>Add Product</button>
          </div>
        </form>
      </div>
    </main>
  )
}