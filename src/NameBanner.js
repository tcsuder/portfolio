import React from 'react';
import propTypes from 'prop-types';

function NameBanner({ image, opacity }) {
  return (
    <header id="banner" className="banner">
      <style jsx>{`
        header.banner {
          background: linear-gradient(rgba(251,222,222,.4), rgba(10,20,30,.9)), url(${image});
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 580px;
          overflow: hidden;
        }
        h1.title {
          background: rgba(255,255,255,${opacity});
          color: rgba(0,0,0,1);
          font-size: 18em;
          font-family: 'Amiko';
          letter-spacing: -.02em;
          line-height: .6em;
          margin: 0;
          mix-blend-mode: screen;
          padding-top: 150px;
          transition: .5s;
        }
        span.last-name {
          font-size: .666em;
        }
      `}</style>
      <h1 id="title" className="title">tyler
        <br/>
      <span className="last-name">suderman</span></h1>
    </header>
  );
}

NameBanner.propTypes = {
  image: propTypes.string.isRequired
}

export default NameBanner;
