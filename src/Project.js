import React from 'react';
import propTypes from 'prop-types';

function NameBanner({didScroll, photo}) {
  return (
    <div className="hood">
      <style jsx>{`
        div.hood {
          background: linear-gradient(rgba(0,0,0,.8), rgba(251,222,222,.8)), url(${colorHood});
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 350px;
        }
        h1.title {
          background: #fff;
          border-bottom: 40px solid white;
          font-family: 'Kameron', serif;
          font-size: 12em;
          line-height: .75em;
          margin: 0 auto;
          mix-blend-mode: screen;
        }
      `}</style>
      {didScroll &&
        <style jsx>{`
          div.hood {
            background: linear-gradient(rgba(0,0,0,.8), rgba(251,222,222,.8)), url(${photo});
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 350px;
          }
        `}</style>}
      <h1 className="title">TYLER SUDER<span className="minimize">MAN</span></h1>
    </div>
  );
}

NameBanner.propTypes = {
  photo: propTypes.string.isRequired,
  didScroll: propTypes.bool.isRequired
}

export default NameBanner;
