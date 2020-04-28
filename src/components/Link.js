import React, { Fragment } from 'react'
import propTypes from 'prop-types'

const Link = ({ highlight, link }) => (
  <Fragment>
    <style jsx="true">{`
      .link:hover {
        color: #f5bb3d;
      }
    `}</style>
    <a
      id={link.id}
      className="link"
      target="_blank"
      rel="noopener noreferrer"
      href={link.href}
      onMouseEnter={() => {
        highlight(link.displayName)
      }}
      onMouseLeave={() => {
        highlight('')
      }}>
      {link.displayText}
    </a>
  </Fragment>
)

Link.propTypes = {
  link: propTypes.object.isRequired,
  highlight: propTypes.func.isRequired,
}

export default Link
