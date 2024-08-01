interface Product {
  name: string, 
  unitPrice: number
}

interface SaleProduct extends Product {
  quantity: number
}

interface ProductWithID extends Product {
  id: number
}

interface InventoryProduct extends ProductWithID {
  category: string,
  stock: number,
  expire: string | null
}

interface Customer {
  name: string,
  email: string,
  phone: string,
}

interface CustomerWithID extends Customer {
  id: number
}

interface Category {
  name: string
}

interface Sale {
  date: string,
  total: number,
  customer_id: number,
  products: number[]
}