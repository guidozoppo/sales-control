import { Link } from "react-router-dom"
import { ProductRowInventory } from "./ProductRowInventory"
import { useAppSelector } from "../../../hooks/store"
import { useProductActions } from "../../../store/products/hooks/useProductActions"

export const Inventory = () => {
  const products = useAppSelector((state) => state.products)
  const { deleteProduct } = useProductActions()
  
  const handleDeleteProduct = (e: React.MouseEvent<HTMLElement>) => {
    deleteProduct(parseInt(e.currentTarget.id))  
  }
  
  const handleEditProduct = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.id)
  }

  return (
    <main className='main-customers'>
      <header className='header-customers'>
        <h1>Inventory</h1>
        <Link to='/createProduct'>
          <button>
            <i className="bi bi-plus"></i>
            Add Product
          </button>
        </Link>
      </header>
      <div className='table-customers'>
        { products.length > 0 ? 
        <table>
          <thead>
            <tr>
              <th className='column-number'>N°</th>
              <th className='column-name'>Name</th>
              <th className='column-price'>Price</th>
              <th className='column-stock'>Stock</th>
              <th className='column-category'>Category</th>
              <th className='column-expire'>Expire Date</th>
              <th className='column-actions'>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {products.map( p => (
              <ProductRowInventory 
                product={p} 
                handleDeleteProduct={handleDeleteProduct} 
                handleEditProduct={handleEditProduct} 
                key={p.id}
              />
            ))}
          </tbody>
        </table>
        : <h1>There aren't products registered in the inventory</h1>
        }
      </div>
    </main>
  )
} 