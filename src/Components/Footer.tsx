import './Footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer-container'>
      <div>© {currentYear} - Sales Control</div>
      <div>
        <p>Developed by Guido Zoppo</p>
      </div>
    </footer>
  )
}