import React from 'react';
import propTypes from 'prop-types';

const NameBanner = ({
  image, 
  isLimitedWidthView,
  opacity, 
}) => {
  return (
    <header id="banner" className="banner">
      <style jsx='true'>{`
        header.banner {
          background: linear-gradient(
              rgba(251, 222, 222, 0.65),
              rgba(10, 20, 30, 0.9)
            ),
            url(${image});
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: ${!isLimitedWidthView ? `calc(500px + 7vw);` : `375px`};
          overflow: hidden;
        }
        h1.title {
          background: rgba(255, 255, 255, ${opacity});
          color: rgba(0, 0, 0, 1);
          font-size: 14em;
          font-size: ${!isLimitedWidthView ? `calc(9em + 10vw)` : `8em`};
          font-family: "Amiko";
          letter-spacing: -0.02em;
          line-height: 0.65em;
          margin: 0;
          mix-blend-mode: screen;
          padding-top: 100px;
          transition: 0.5s;
        }
        span.last-name {
          font-size: ${!isLimitedWidthView ? `calc(.7em - 1vw)` : `.5em`};
        }
      `}</style>
      <h1 id="title" className="title">
        tyler
        <br />
        <span className="last-name">suderman</span>
      </h1>
    </header>
  );
}

NameBanner.propTypes = {
  image: propTypes.string.isRequired,
  isLimitedWidthView: propTypes.bool.isRequired,
  opacity: propTypes.number.isRequired,
}

export default NameBanner;
