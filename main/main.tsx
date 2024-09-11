import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './App.tsx'
import { store } from '../redux';

import './index.css'

// Base styles for media player and provider (~400B).
// import '@vidstack/react/player/styles/base.css';

// React Responsive Carousel CSS
import 'react-responsive-carousel/lib/styles/carousel.min.css';


// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
