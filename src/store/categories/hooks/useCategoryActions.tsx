import { useDispatch } from "react-redux"
import { addNewCategory } from "../slices/categoriesSlices"

export const useCategoryActions = () => {
  const dispatch = useDispatch()

  const addCategory = ({name}: Category) => {
    dispatch(addNewCategory({name}))
  }

  return { addCategory }
}