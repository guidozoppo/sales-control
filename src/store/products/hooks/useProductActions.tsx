import { useDispatch } from "react-redux"
import { addNewProduct, editProductByID, deleteProductByID } from "../slices/productsSlices"

export const useProductActions = () => {
  const dispatch = useDispatch()

  const addProduct = ({name, stock, unitPrice, category, expire}: InventoryProduct) => {
    dispatch(addNewProduct({id: Math.floor(Math.random() * 100000), name, stock, unitPrice, category, expire}))
  }
  
  const deleteProduct = ( id: number ) => {
    dispatch(deleteProductByID(id))
  }
  
  const editProduct = ({id, name, stock, unitPrice, category, expire}: InventoryProduct) => {
    dispatch(editProductByID({id, name, stock, unitPrice, category, expire}))
  }

  return { addProduct, editProduct, deleteProduct }
}