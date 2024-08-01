import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Category[] = (() => {
  const persistedState = localStorage.getItem("categories");
  
    return persistedState ? JSON.parse(persistedState) : []
})();

export const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    addNewCategory: (state, action: PayloadAction<Category>) => {
      state.push({...action.payload} )
    }/* ,
    deleteCategoryByID: (state, action: PayloadAction<number>) => {
      return state.filter((category) => category.id !== action.payload)
    } */
  }
})

export default categorySlice.reducer
export const { addNewCategory/* , deleteCategoryByID */ } = categorySlice.actions