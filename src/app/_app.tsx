import type { AppProps } from 'next/app'
import '../styles/globals.scss';

export default function EntryPortfolioPoint({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}