import React from 'react';
import propTypes from 'prop-types';

const LinkDescription = ({
  highlightedLink,
  image,
}) => (
  <div>
    <style jsx>{`
      #display-link {
        background: linear-gradient(rgba(251,222,222,.65), rgba(10,20,30,.9)), url(${image});
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 580px;
        left: calc(250px + 30%);
        left: calc(250px + 35vw);
        min-height: 100%;
        min-width: 500%;
        overflow: hidden;
        position: fixed;
        top: 0;
        width: 100vw;
      }
      #display-link ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        list-style: none;
        padding-left: 20px;
        padding-top: 100px;
        width: 70px;
      }
      #display-link li h1 {
        font-size: 7rem;
        font-size: calc(6rem + 3vw);
        font-family: "Karla", sans-serif;
        line-height: .75em;
        margin: 0;
      }
      pre {
        color: rgb(10,20,30);
        color: white;
        font-family: 'Amiko', sans-serif;
        margin: 0;
      }
    `}</style>
    <div id="display-link">
      <ul>
        {highlightedLink.split('').map((char, i) => {
          return (
            <li key={i}>
              <h1><pre>{char.toUpperCase()}</pre></h1>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
);

LinkDescription.propTypes = {
  highlightedLink: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
}

export default LinkDescription;
