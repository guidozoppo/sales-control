import { Link } from "react-router-dom"
import { ProductRowInventory } from "./ProductRowInventory"
import { useAppSelector } from "../../../hooks/store"
import { useProductActions } from "../../../store/products/hooks/useProductActions"
import './Inventory.css';
import { useEffect } from "react";

export const Inventory = () => {
  useEffect(() => {
    document.title = 'Inventario - Sales Control';
  }, []); 

  const products = useAppSelector((state) => state.products)
  const { deleteProduct } = useProductActions()
  
  const handleDeleteProduct = (e: React.MouseEvent<HTMLElement>) => {
    deleteProduct(parseInt(e.currentTarget.id))  
  }
  return (
    <main className='main-customers'>
      <header className='header-customers'>
        <div className="title-with-back">
          <Link className="close-link" to="/" aria-label="Volver">
            <i className="bi bi-arrow-left"></i>
          </Link>
          <div>
            <h1>Inventario</h1>
            <p className="page-kicker">{products.length} productos</p>
          </div>
        </div>
        <Link className="add-action" to='/createProduct'>
          <button>
            <i className="bi bi-plus-lg"></i>
            Agregar producto
          </button>
        </Link>
      </header>
      <div className='table-customers'>
        { products.length > 0 ? 
        <table>
          <thead>
            <tr>
              <th className='column-number'>N°</th>
              <th className='column-name'>Nombre</th>
              <th className='column-price'>Precio</th>
              <th className='column-stock'>Stock</th>
              <th className='column-category'>Categoría</th>
              <th className='column-expire'>Vencimiento</th>
              <th className='column-actions'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map( p => (
              <ProductRowInventory 
                product={p} 
                handleDeleteProduct={handleDeleteProduct} 
                key={p.id}
              />
            ))}
          </tbody>
        </table>
        : (
          <div className="empty-state card" style={{width: 'min(1100px, 100%)'}}>
            <i className="bi bi-box-seam"></i>
            <h2>El inventario está vacío</h2>
            <p>Cargá el primer producto para empezar a vender.</p>
          </div>
        )
        }
      </div>
    </main>
  )
}
