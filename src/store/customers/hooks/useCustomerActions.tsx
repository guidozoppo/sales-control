import { addNewCustomer, deleteCustomerById } from '../slices/customersSlices'
import { useAppDispatch } from '../../../hooks/store'

export const useCustomerActions = () => {
  const dispatch = useAppDispatch()

  const addCustomer = ({name, phone, email}: Customer) => {
    dispatch(addNewCustomer({name, phone, email}))
  }

  const deleteCustomer = ( id: number ) => {
    dispatch(deleteCustomerById(id))
  }

  return { addCustomer, deleteCustomer }
}