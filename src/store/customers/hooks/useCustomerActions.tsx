import { addNewCustomer, deleteCustomerById, editCustomerById } from '../slices/customersSlices'
import { useAppDispatch } from '../../../hooks/store'

export const useCustomerActions = () => {
  const dispatch = useAppDispatch()

  const addCustomer = ({name, phone, email}: Customer) => {
    dispatch(addNewCustomer({name, phone, email}))
  }
  
  const editCustomer = ({name, phone, email, id}: CustomerWithID) => {
    dispatch(editCustomerById({name, phone, email, id}))
  }

  const deleteCustomer = ( id: number ) => {
    dispatch(deleteCustomerById(id))
  }

  return { addCustomer, editCustomer, deleteCustomer }
}