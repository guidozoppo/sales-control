import { useEffect } from "react"
import { useAppSelector } from "../../hooks/store"
import { Link } from "react-router-dom"
import './SalesReports.css'

export const SalesReports = () => {
  useEffect(() => {
    document.title = 'Reportes - Sales Control';
  }, []);

  const sales = useAppSelector((state) => state.sales)
  const customers = useAppSelector((state) => state.customers)

  const totalRevenue = sales.reduce((acc, sale) => acc + Number(sale.total || 0), 0)
  const averageTicket = sales.length ? totalRevenue / sales.length : 0
  const getCustomerName = (id: number) => customers.find((c) => c.id === id)?.name ?? 'Cliente'

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="title-with-back">
          <Link className="close-link" to="/" aria-label="Volver">
            <i className="bi bi-arrow-left"></i>
          </Link>
          <div>
            <h1>Reportes de ventas</h1>
            <p className="page-kicker">Resumen de las transacciones registradas</p>
          </div>
        </div>
        <Link className="add-action" to="/registerSale">
          <button>
            <i className="bi bi-receipt"></i>
            Nueva venta
          </button>
        </Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card card">
          <span>Ventas</span>
          <strong>{sales.length}</strong>
        </article>
        <article className="stat-card card">
          <span>Facturación</span>
          <strong>${totalRevenue.toFixed(2)}</strong>
        </article>
        <article className="stat-card card">
          <span>Ticket promedio</span>
          <strong>${averageTicket.toFixed(2)}</strong>
        </article>
      </section>

      <div className="table-customers">
        {sales.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={`${sale.date}-${index}`}>
                  <td>{sale.date}</td>
                  <td>{getCustomerName(sale.customer_id)}</td>
                  <td><span className="badge badge-muted">{sale.products.length}</span></td>
                  <td>${Number(sale.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state card" style={{width: 'min(1100px, 100%)'}}>
            <i className="bi bi-bar-chart-line"></i>
            <h2>Todavía no hay ventas</h2>
            <p>Cuando registres la primera, va a aparecer acá el detalle.</p>
          </div>
        )}
      </div>
    </main>
  )
}
