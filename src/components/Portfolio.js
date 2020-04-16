import React, { useReducer, useEffect } from 'react';
import NameBanner from './NameBanner';
import About from './About';
import LinkDescription from './LinkDescription';
import defaultState from '../defaultState';

// TODO: export this
const actionTypes = {
  SET_BANNER_OPACITY: 'SET_BANNER_OPACITY',
  SET_DISPLAY_IMAGE: 'SET_DISPLAY_IMAGE',
  SET_HIGHLIGHTED_LINK: 'SET_HIGHLIGHTED_LINK',
  SET_IS_MOBILE_DEVICE: 'SET_IS_MOBILE_DEVICE',
  SET_IS_LIMITED_WIDTH_VIEW: 'SET_IS_LIMITED_WIDTH_VIEW',
}

// TODO: test reducer
function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_BANNER_OPACITY:
      const { bannerOpacity } = action;
      return {
        ...state,
        bannerOpacity,
      };
    case actionTypes.SET_DISPLAY_IMAGE:
      const { displayImage, imageList } = action;
      return {
        ...state,
        imageList,
        displayImage,
      };
    case actionTypes.SET_HIGHLIGHTED_LINK:
      const { highlightedLink } = action;
      return {
        ...state,
        highlightedLink,
      };
    case actionTypes.SET_IS_LIMITED_WIDTH_VIEW:
      const { isLimitedWidthView } = action;
      return {
        ...state,
        isLimitedWidthView,
      };
    default:
      throw new Error();
  }
}

// TODO: export and test window listener
const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

// send this block to helpers file
const initialState = (defaultState) => {
  return {
    bannerOpacity: defaultState.bannerOpacity,
    displayImage: defaultState.smallImageList['trail3mobile'],
    highlightedLink: '',
    imageList: defaultState.smallImageList,
    isLimitedWidthView: true,
    largeImageList: defaultState.largeImageList,
    linksByKey: defaultState.linksByKey,
    smallImageList: defaultState.smallImageList,
  }
}

const getRandomImage = (imageList) => {
  const keys = Object.keys(imageList);
  const randomKey =
    keys[Math.floor(Math.random() * (Object.keys(imageList).length - 0))];
  return imageList[randomKey];
};

const getIsLimitedWidthView = () => {
  const screenWidth = window.innerWidth;
  return screenWidth < 400;
}

const setIsLimitedWidthView = ({dispatch}) => {
  dispatch({
    type: actionTypes.SET_IS_LIMITED_WIDTH_VIEW,
    isLimitedWidthView: getIsLimitedWidthView(),
  });
}

const setDisplayImage = ({state, dispatch}) => {  
  const isLimitedWidthView = getIsLimitedWidthView();
  const imageList = isLimitedWidthView ? state.smallImageList : state.largeImageList;
  const displayImage = getRandomImage(imageList);
  dispatch({ type: actionTypes.SET_DISPLAY_IMAGE, imageList, displayImage });
}

const setHighlightedLink = ({highlightedLink, dispatch}) => {
  dispatch({ type: actionTypes.SET_HIGHLIGHTED_LINK, highlightedLink });
}

const setBannerOpacity = ({dispatch}) => {
  const bannerBottom = document.getElementById('banner').getBoundingClientRect().bottom;
  const slowDownOpacityChange = (bannerBottom - 100)/ 50;
  if (slowDownOpacityChange < 10) {
    const newBannerOpacity = slowDownOpacityChange / 10;
    dispatch({ type: actionTypes.SET_BANNER_OPACITY, bannerOpacity: newBannerOpacity});
  } else {
    dispatch({ type: actionTypes.SET_BANNER_OPACITY, bannerOpacity: 1});
  }
}

const shouldDisplayLinkDescription = ({ state }) =>
  !!state.highlightedLink && !state.isLimitedWidthView;

const Portfolio = () => {
  const [state, dispatch] = useReducer(reducer, initialState(defaultState));

  useWindowEvent("scroll", () => {
    setBannerOpacity({ dispatch });
  });

  useWindowEvent('resize', () => {
    setIsLimitedWidthView({ dispatch });
  });

  useEffect(() => {
    document.title = "TYLER SUDERMAN";
    setIsLimitedWidthView({ dispatch });
    setDisplayImage({ dispatch, state });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <style global="true" jsx="true">{`
        @import url("https://fonts.googleapis.com/css2?family=Oxygen");
        @font-face {
          font-family: "Amiko";
          src: url(${require("../fonts/Amiko-Bold.eot")});
          src: url(${require("../fonts/Amiko-Bold.woff2")}) format("woff2"),
            url(${require("../fonts/Amiko-Bold.woff")}) format("woff");
          font-weight: bold;
          font-style: normal;
        }
        body {
          font-family: "Amiko", sans-serif;
          color: rgb(10, 20, 30);
          min-width: 320px;
          margin: 0;
          padding: 0;
        }
        a {
          color: rgb(10, 20, 30);
        }
        #root,
        main,
        .section-container {
          min-width: inherit;
        }
        .section-container {
          max-width: 1200px;
          min-width: 320px;
          margin: 0 auto;
          width: 70%;
        }
        .section {
          min-width: 300px;
          padding-left: 20px;
          padding-top: calc(50px + 5vw);
          padding-bottom: calc(100px + 5vw);
          width: 50vw;
        }
      `}</style>

      <NameBanner
        opacity={state.bannerOpacity}
        image={state.displayImage}
        isLimitedWidthView={state.isLimitedWidthView}
      />

      {shouldDisplayLinkDescription({ state }) && (
        <LinkDescription
          highlightedLink={state.highlightedLink}
          image={state.displayImage}
        />
      )}

      <About
        links={state.linksByKey}
        highlight={(link) =>
          setHighlightedLink({ highlightedLink: link, dispatch })
        }
      />
    </main>
  );
}

export default Portfolio;
