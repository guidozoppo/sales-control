import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CustomerWithID[] = (() => {
	const persistedState = localStorage.getItem("customers");

  return persistedState ? JSON.parse(persistedState) : []
})();

const getNewId = () => {
  const persistedState = localStorage.getItem("customers");
   
  if (persistedState) {
    return JSON.parse(persistedState).length + 1
  }

  return 1
}

const getIndex = (id: number) => {
  const persistedState = localStorage.getItem("customers");
  const customersJSON: CustomerWithID[] = JSON.parse(persistedState!);

  for( let i = 0; customersJSON.length; i++) {
    if(customersJSON[i].id === id) return i;
  }

  return -1;

}

export const customerSlice = createSlice({
  name: "customers",
  initialState: initialState,
  reducers: {
    addNewCustomer: (state, action: PayloadAction<Customer>) => {
      const id = getNewId()
      state.push({id, ...action.payload})
    },
    editCustomerById: (state, action: PayloadAction<CustomerWithID>) => {
      const index = getIndex(action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      }
    },
    deleteCustomerById: (state, action: PayloadAction<number>) => {
      return state.filter((customer) => customer.id !== action.payload)
    }
  }
})

export default customerSlice.reducer
export const {addNewCustomer, editCustomerById, deleteCustomerById } = customerSlice.actions