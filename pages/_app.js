import '../styles/globals.css';
import React from 'react';
import { useRouter } from 'next/router';
import ResponsiveAppBar from '../components/topBar';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // we don't want the app bar to appear on the login page or index
  const hideAppBar = router.pathname === '/login' || router.pathname === '/' || router.pathname === '/register';

  return (
    <>
      {!hideAppBar && <ResponsiveAppBar />}
      <Component {...pageProps} />
    </>
  );
}
