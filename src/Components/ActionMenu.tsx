import React from "react"
import './ActionMenu.css'

interface Props {
  icon: React.ReactNode,
  title: string,
  description: string
}

export const ActionMenu: React.FC<Props> = ({ icon, title, description}) => {
  return (
    <article className="individual-action">
      <div className="iconaction-container">
        {icon}
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </article>
  )
}