import { Header } from "./Components/commonComponents/Header"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MainMenu } from "./Components/MainMenu";
import './App.css'
import { Footer } from "./Components/commonComponents/Footer";
import { Routes, Route } from 'react-router-dom';
import { RegisterSale } from "./Components/Sections/RegisterSale";
import { CreateProduct } from "./Components/Products/CreateProduct";
import { Customers } from "./Components/Sections/Customer/Customers"
import { SalesReports } from "./Components/Sections/SalesReports";
import { AddCustomer } from "./Components/Sections/Customer/AddCustomer";
import { Inventory } from "./Components/Sections/inventory/Inventory";
import { CreateCategory } from "./Components/Category/createCategory";
import { EditInventoryItem } from "./Components/Sections/inventory/EditInventoryItem";
import { EditCustomer } from "./Components/Sections/Customer/EditCustomer";
import { Login } from "./Components/Sections/Login/login";

function App() {
  return (
    <main className="main-app">
      <Header />
        <Routes>
          <Route path="/" element={<MainMenu />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/registerSale" element={<RegisterSale />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/editInventoryItem/:id" element={<EditInventoryItem />}/>
          <Route path="/createProduct" element={<CreateProduct />}/>
          <Route path="/createCategory" element={<CreateCategory />}/>
          <Route path="/customers" element={<Customers />}/>
          <Route path="/addCustomer" element={<AddCustomer />}/>
          <Route path="/editCustomer/:id" element={<EditCustomer />}/>
          <Route path="/salesReports" element={<SalesReports />}/>
        </Routes>
      <Footer />
    </main>
  )
}

export default App
