import { useDispatch } from "react-redux"
import { registerNewSale } from "../slices/salesSlices"

export const useSaleActions = () => {
  const dispatch = useDispatch()

  const registerSale = ({date, total, customer_id, products}: Sale) => {
    console.log(date)
    dispatch(registerNewSale({date, total, customer_id, products}))
  }

  return { registerSale }
}