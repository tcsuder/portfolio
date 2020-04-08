import React from 'react';
import propTypes from 'prop-types';

const Link = ({
  highlight, 
  link,
}) => (
  <a
    id={link.id}
    className="link"
    target="_blank"
    rel="noopener noreferrer"
    href={link.href}
    onMouseEnter={() => {
      highlight(link.displayName);
    }}
    onMouseLeave={() => {
      highlight('');
    }}>
    {link.displayText}
  </a>
);

Link.propTypes = {
  link: propTypes.object.isRequired,
  highlight: propTypes.func.isRequired,
}

export default Link;
