import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InventoryProduct[] = (() => {
  const persistedState = localStorage.getItem("products");
  
    return persistedState ? JSON.parse(persistedState) : [];
})();

const getIndex = (ref: string | number) => {
  const persistedState = localStorage.getItem("products");
  if (!persistedState) return -1;
  
  const productsJSON = JSON.parse(persistedState);
  
  for(let i = 0; i < productsJSON.length ; i++) {
    const product = productsJSON[i];

    if(typeof ref === 'string') {
      if (product.name.toLowerCase() === ref) {
        return i;
      }
    }
    
    if(typeof ref === 'number') {
      if (product.id === ref) {
        return i;
      }
    }
  }
    
  return -1;
}

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<InventoryProduct>) => {
      const index = getIndex(action.payload.name.toLowerCase());

      if (index >= 0) {
        state[index].stock = Number(action.payload.stock) + Number(state[index].stock);
      } else {
        state.push(action.payload);
      }
    },
    editProductByID: (state, action: PayloadAction<InventoryProduct>) => {
      const index = getIndex(action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    deleteProductByID: (state, action: PayloadAction<number>) => {
      return state.filter((product) => product.id !== action.payload);
    }
  }
})

export default productSlice.reducer;
export const { addNewProduct, editProductByID, deleteProductByID } = productSlice.actions;