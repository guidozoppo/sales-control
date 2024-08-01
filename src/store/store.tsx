import {type Middleware, configureStore } from "@reduxjs/toolkit";
import customerReducer from './customers/slices/customersSlices';
import productReducer from './products/slices/productsSlices';
import categoryReducer from './categories/slices/categoriesSlices';
import saleReducer from './sales/slices/salesSlices';

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  const state = store.getState()

  localStorage.setItem("products", JSON.stringify(state.products))
  localStorage.setItem("customers", JSON.stringify(state.customers))
  localStorage.setItem("categories", JSON.stringify(state.categories))
  localStorage.setItem("sales", JSON.stringify(state.sales))
}

const store = configureStore({
  reducer: {
    customers: customerReducer,
    products: productReducer,
    categories: categoryReducer,
    sales: saleReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleware
    )
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
