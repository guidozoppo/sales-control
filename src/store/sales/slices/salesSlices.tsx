import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Sale[] = (() => {
  const persistedState = localStorage.getItem("sales");
  
    return persistedState ? JSON.parse(persistedState) : []
})();

export const saleSlice = createSlice({
  name: "sales",
  initialState: initialState,
  reducers: {
    registerNewSale: (state, action: PayloadAction<Sale>) => {
      state.push({...action.payload} )
    }
  }
});

export default saleSlice.reducer;
export const { registerNewSale } = saleSlice.actions;