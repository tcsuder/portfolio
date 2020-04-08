import React, { useReducer, useEffect } from 'react';
import NameBanner from './NameBanner';
import About from './About';
import LinkDescription from './LinkDescription';
import defaultState from './defaultState';

// TODO: export this
const actionTypes = {
  SET_BANNER_OPACITY: 'SET_BANNER_OPACITY',
  SET_DISPLAY_IMAGE: 'SET_DISPLAY_IMAGE',
  SET_HIGHLIGHTED_LINK: 'SET_HIGHLIGHTED_LINK',
  SET_IS_WIDE_SCREEN: 'SET_IS_WIDE_SCREEN',
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
    case actionTypes.SET_IS_WIDE_SCREEN:
      const { isWideScreen } = action;
      return {
        ...state,
        isWideScreen,
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
    isWideScreen: false,
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

const getIsWideScreen = () => {
  // TODO: move to constants file with action types
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );
  const screenWidth = window.innerWidth;
  return screenWidth < 550 || mobile ? false : true;
}

const setIsWideScreen = ({dispatch}) => {
  dispatch({
    type: actionTypes.SET_IS_WIDE_SCREEN,
    isWideScreen: getIsWideScreen(),
  });
}

const setDisplayImage = ({state, dispatch}) => {  
  const isWideScreen = getIsWideScreen();
  console.log(isWideScreen);
  const imageList = isWideScreen ? state.largeImageList : state.smallImageList;
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
  !!state.highlightedLink && state.isWideScreen;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState(defaultState));

  useWindowEvent("scroll", () => {
    setBannerOpacity({ dispatch });
  });

  useWindowEvent('resize', () => {
    setIsWideScreen({ dispatch });
  });

  useEffect(() => {
    document.title = "TYLER SUDERMAN";
    setIsWideScreen({ dispatch });
    setDisplayImage({ dispatch, state });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Kosugi+Maru");
        @font-face {
          font-family: "Amiko";
          src: url(${require("./fonts/Amiko-Bold.eot")});
          src: url(${require("./fonts/Amiko-Bold.eot?#iefix")})
              format("embedded-opentype"),
            url(${require("./fonts/Amiko-Bold.woff2")}) format("woff2"),
            url(${require("./fonts/Amiko-Bold.woff")}) format("woff");
          font-weight: bold;
          font-style: normal;
        }
        body {
          font-family: "Amiko", sans-serif;
          color: rgb(10, 20, 30);
          min-width: 500px;
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
          min-width: 500px;
          margin: 0 auto;
          min-height: 500px;
          width: 70%;
        }
        .section {
          min-width: 480px;
          padding-left: 20px;
          padding-top: calc(100px + 5vw);
          padding-bottom: calc(100px + 5vw);
          width: 50vw;
        }
      `}</style>

      <NameBanner
        opacity={state.bannerOpacity}
        image={state.displayImage}
        isWideScreen={state.isWideScreen} />

      {shouldDisplayLinkDescription({state}) && (
        <LinkDescription
          highlightedLink={state.highlightedLink}
          image={state.displayImage} />
      )}

      <About
        links={state.linksByKey}
        highlight={(link) =>
          setHighlightedLink({ highlightedLink: link, dispatch })
        } />

    </main>
  );
}

export default App;
