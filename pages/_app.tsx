import { Inter } from '@next/font/google';
import cx from 'classnames';
import '../styles/globals.css';
import { store } from '../store';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <div
        className={
          cx(inter.variable) + 'min-h-screen overflow-x-hidden mx-auto'
        }>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
