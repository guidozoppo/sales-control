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

  const initialValues = {
    customerId: 0,
    saleDate: new Date()
  };

  const inventory = useAppSelector((state) => state.products);
  const customers = useAppSelector((state) => state.customers);
  const { registerSale } = useSaleActions();
  const [saleInfo, setSaleInfo] = useState(initialValues);
  const [dateError, setDateError] = useState('');
  const [saleTotal, setSaleTotal] = useState(0);
  const [saleProductsId, setSaleProductsId] = useState([])
  
  const [products, setProducts] = useState<SaleProduct[]>([
    { name: '', quantity: 1, unitPrice: 0 },
    { name: '', quantity: 1, unitPrice: 0 },
    { name: '', quantity: 1, unitPrice: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e
    const { name, value } = target

    const newValues = {
      ...saleInfo,
      [name]: value
    }

    if(e.target.tagName === 'SELECT') {
      newValues.customerId = parseInt(e.target.value)
    }
    
    setSaleInfo(newValues)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    products.forEach( p => {
      checkProduct(p)
      //   Chequear que el producto exista
    //   Chequear que la cantidad sea razonable al stock
    //   Cargar la venta
    //   Reiniciar el formulario
    })

    if(saleProductsId.length > 0) {
      const year = saleInfo.saleDate.getFullYear();
      const month = saleInfo.saleDate.getMonth();
      const day = saleInfo.saleDate.getDate();
      const formattedDate = `${year}-${month}-${day}`;
  
      const sale: Sale = {
        date: formattedDate,
        customer_id: saleInfo.customerId,
        products: [1, 2],
        total: saleTotal
      }
  
      //registerSale(sale)
    }
  }

  const checkProduct = (product: SaleProduct) => {
    console.log(product)
    console.log(inventory)
  }
  
  const handleProductChange = (index: number, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];

    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: name === 'quantity' || name === 'unitPrice' ? Number(value) : value, // Si se modifica quantity o unitPrice al value lo hago number, sino ( se modifica el productName) lo dejo como string
    };

    setProducts(updatedProducts);
    console.log(updatedProducts)
  };

  useEffect(() => {
    calculateNewTotal();
  }, [products]);

  const calculateNewTotal = () => {
    let newTotal = 0
    products.forEach( p => {
      const totalProduct = (p.quantity * p.unitPrice)
      newTotal += totalProduct
    })

    setSaleTotal(newTotal)
  }

  const addProductRow = () => {
    setProducts([...products, { name: '', quantity: 1, unitPrice: 0 }]);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <main className="main-registerSale">
      <div className="container-registerSale">
        <h1>Register a sale</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="data-sale">
            {<div>
              <label htmlFor="customerName">Customer</label>
              <select onChange={handleChange}>
                {customers.map((customer, index) => {
                  return(
                    <option key={index} value={customer.id}>{customer.name}</option>
                  )
                })}
              </select>
              {/* <input 
                type="text" 
                id="customerName"
                name="customerName"
                placeholder="Jorge Lobos"
                value={saleInfo.customerName}
                onChange={handleChange}
                /> */}
            </div>}
            <div>
            <label htmlFor="saleDate">Sale Date</label>
            <input 
              type="date" 
              id="saleDate"
              name="saleDate"
              value={formatDate(saleInfo.saleDate)}
              onChange={handleChange}
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
              />
            ))}
          </div>
          {dateError && <p className='dateerror'>{dateError}</p>}
          <p>TOTAL: ${saleTotal}</p>
          <div className="buttons-container">
            <button className="button-registerSale" type="submit">Register Sale</button>
            <button className="button-addProduct" type="button" onClick={addProductRow}>Add Product</button>
          </div>
        </form>
      </div>
    </main>
  )
}