import { Link } from "react-router-dom"
import { ActionMenu } from "./ActionMenu.tsx"
import './MainMenu.css'

export const MainMenu = () => {
  return (
    <main className="mainmenu-container">
      <h2>Main Menu</h2>
      <section className="actions-container">
        <Link to="/registerSale">
          <ActionMenu icon={<i style={{backgroundColor: "#3B82F6"}} className="bi bi-currency-dollar"></i>} title="Register Sale" description="Record new sales transactions"/>
        </Link>
        <Link to='/loadProducts'>
          <ActionMenu icon={<i style={{backgroundColor: "#22C55E"}} className="bi bi-box"></i>} title="Load Products" description="Add new products to the inventory"/>
        </Link>
        <Link to='/customers'>
          <ActionMenu icon={<i style={{backgroundColor: "#EC4899"}} className="bi bi-people"></i>} title="Customers" description="Manage customer information"/>
        </Link>
        <Link to='/salesReports'>
          <ActionMenu icon={<i style={{backgroundColor: "#EAB308"}} className="bi bi-bar-chart"></i>} title="Sales Reports" description="View sales data and analytics"/>
        </Link>
      </section>
    </main>
  )
}