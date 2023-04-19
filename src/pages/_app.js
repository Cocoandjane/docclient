import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '@/components/Layout'
import {useRouter} from 'next/router'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  if (
    router.pathname === "/auth/login" ||
    router.pathname === "/auth/register"
  ) {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={pageProps.session}>
        <Layout session={pageProps.session}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    );
  }
}