import '../styles/globals.css'
import { createEmotionCache, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				emotionCache={createEmotionCache({ key: 'mantine', prepend: false })} // prevent tailwindcss from overriding mantine styles
			>
				<Component {...pageProps} />
			</MantineProvider>
		</SessionProvider>
	)
}

export default MyApp
