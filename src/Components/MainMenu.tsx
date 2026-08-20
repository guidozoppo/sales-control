import { Link } from "react-router-dom"
import { ActionMenu } from "./ActionMenu.tsx"
import './MainMenu.css'
import { useEffect } from "react";

export const MainMenu = () => {
  useEffect(() => {
    document.title = 'Sales Control';
  }, []); 
  
  return (
    <main className="mainmenu-container">
      <div className="hero">
        <p className="eyebrow">Dashboard</p>
        <h2>¿Qué querés hacer hoy?</h2>
        <p>Registrá ventas, controlá stock, administrá clientes y mirá el rendimiento del negocio.</p>
      </div>
      <section className="actions-container">
        <Link to="/registerSale">
          <ActionMenu icon="bi-receipt" accent="blue" title="Registrar venta" description="Cargá una nueva transacción con productos y cliente"/>
        </Link>
        <Link to='/inventory'>
          <ActionMenu icon="bi-box-seam" accent="green" title="Inventario" description="Consultá stock, precios y vencimientos"/>
        </Link>
        <Link to='/customers'>
          <ActionMenu icon="bi-people" accent="pink" title="Clientes" description="Alta, edición y seguimiento de clientes"/>
        </Link>
        <Link to='/salesReports'>
          <ActionMenu icon="bi-bar-chart-line" accent="amber" title="Reportes" description="Totales, ticket promedio y listado de ventas"/>
        </Link>
      </section>
    </main>
  )
}
