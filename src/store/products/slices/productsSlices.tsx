import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InventoryProduct[] = (() => {
  const persistedState = localStorage.getItem("products");
  
    return persistedState ? JSON.parse(persistedState) : []
})();

/* const getId = () => {
  const persistedState = localStorage.getItem("products");
  
  if (persistedState) {
    return JSON.parse(persistedState).length > 0 ? JSON.parse(persistedState).length + 1 : 1
  }
  
  return 1
} */

const getIndex = (name: string) => {
  const persistedState = localStorage.getItem("products");
  if (!persistedState) return -1;
  
  const jsonState = JSON.parse(persistedState) 
  
  for(let i = 0; i < jsonState.length ; i++) {
    const product = jsonState[i]

    if (product.name.toLowerCase() === name) {
      return i
    }
  }
    
  return -1
}

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<InventoryProduct>) => {
      const index = getIndex(action.payload.name.toLowerCase())

      if (index >= 0) {
        state[index].stock = Number(action.payload.stock) + Number(state[index].stock)
      } else {
        state.push(action.payload)
      }
    },
    deleteProductByID: (state, action: PayloadAction<number>) => {
      return state.filter((product) => product.id !== action.payload)
    }
  }
})

export default productSlice.reducer
export const { addNewProduct, deleteProductByID } = productSlice.actions