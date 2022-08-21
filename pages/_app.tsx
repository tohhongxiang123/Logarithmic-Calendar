import '../styles/globals.css'
import { createEmotionCache, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <MantineProvider        
    withGlobalStyles
    withNormalizeCSS
    emotionCache={createEmotionCache({ key: 'mantine', prepend: false })} // prevent tailwindcss from overriding mantine styles
    >
      <Component {...pageProps} />
    </MantineProvider>
}

export default MyApp
