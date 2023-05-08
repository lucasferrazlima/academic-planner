import '../styles/globals.css';
import React from 'react';
import ResponsiveAppBar from '../components/topBar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
  );
}
