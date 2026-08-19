import React from "react"
import './ActionMenu.css'

interface Props {
  icon: string,
  accent: 'blue' | 'green' | 'pink' | 'amber',
  title: string,
  description: string
}

export const ActionMenu: React.FC<Props> = ({ icon, accent, title, description}) => {
  return (
    <article className="individual-action">
      <div className={`iconaction-container accent-${accent}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <i className="bi bi-arrow-right action-arrow"></i>
    </article>
  )
}
