import Head from 'next/head'
import '@/styles/global.scss'

export default function CR({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Crescendo Recipes</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}