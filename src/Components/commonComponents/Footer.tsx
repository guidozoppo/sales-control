import './Footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer-container'>
      <div>© {currentYear} · <strong>Sales Control</strong></div>
      <div>Desarrollado por Guido Zoppo</div>
    </footer>
  )
}
