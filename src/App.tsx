import { Header } from "./Components/Header"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MainMenu } from "./Components/MainMenu";
import './App.css'
import { Footer } from "./Components/Footer";
import { Routes, Route } from 'react-router-dom';
import { RegisterSale } from "./Components/Sections/RegisterSale";
import { LoadProduct } from "./Components/Sections/LoadProduct";
import { Customers } from "./Components/Sections/Customers"
import { SalesReports } from "./Components/Sections/SalesReports";

function App() {
  return (
    <main className="main-app">
      <Header />
        <Routes>
          <Route path="/" element={<MainMenu />}/>
          <Route path="/registerSale" element={<RegisterSale />}/>
          <Route path="/loadProducts" element={<LoadProduct />}/>
          <Route path="/customers" element={<Customers />}/>
          <Route path="/salesReports" element={<SalesReports />}/>
        </Routes>
      <Footer />
    </main>
  )
}

export default App
