import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hook/useAuth'
import { ModalProvider } from '../hook/useModal'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  ) 
}

export default MyApp
