// https://github.com/nextauthjs/next-auth/issues/1162
import type { User, NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextApiHandler } from 'next'

type GenericObject<T = unknown> = T & {
    [key: string]: any
}

interface AuthToken {
    user: User
    accessToken: string
    accessTokenExpires?: number
    expires_at?: number
    refreshToken: string
    error?: string
}

interface JwtInterface {
    token: AuthToken
    user: User
    account: GenericObject
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (
    payload: AuthToken,
    clientId: string,
    clientSecret: string,
): Promise<AuthToken> => {
    try {
        const url = new URL('https://accounts.google.com/o/oauth2/token')
        url.searchParams.set('client_id', clientId)
        url.searchParams.set('client_secret', clientSecret)
        url.searchParams.set('grant_type', 'refresh_token')
        url.searchParams.set('refresh_token', payload.refreshToken)

        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })

        const refreshToken = await response.json()

        if (!response.ok) {
            throw refreshToken
        }

        // Give a 10 sec buffer
        const now = new Date()
        const accessTokenExpires = now.setSeconds(
            now.getSeconds() + parseInt(refreshToken.expires_in) - 10,
        )

        return {
            ...payload,
            accessToken: refreshToken.access_token,
            accessTokenExpires,
            refreshToken: payload.refreshToken,
        }
    } catch (error) {
        console.error('ERR', error)

        return {
            ...payload,
            error: 'RefreshAccessTokenError',
        }
    }
}

const AuthHandler: NextApiHandler = (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.readonly',
    ]

    const options: NextAuthOptions = {
        providers: [
            GoogleProvider({
                clientId: String(process.env.GOOGLE_ID),
                clientSecret: String(process.env.GOOGLE_SECRET),
                authorization: {
                    url: 'https://accounts.google.com/o/oauth2/v2/auth',
                    params: {
                        response_type: 'code',
                        // prompt: 'consent',
                        include_granted_scopes: 'true',
                        access_type: 'offline',
                        scope: scopes.join(' '),
                    },
                },
            }),
        ],
        secret: process.env.NEXTAUTH_SECRET,
        jwt: {
            // encryption: true,
            secret: process.env.NEXTAUTH_SECRET,
        },
        pages: {
            signIn: '/auth/sign-in'
        },
        debug: process.env.NODE_ENV === 'development',
        callbacks: {
            // @ts-ignore
            async jwt({ token, user, account }: JwtInterface): Promise<AuthToken> {
                let res: AuthToken

                const now = Date.now()

                // Signing in
                if (account && user) {
                    const accessToken = account.access_token
                    const refreshToken = account.refresh_token

                    res = {
                        accessToken,
                        accessTokenExpires: account.expires_at,
                        refreshToken,
                        user,
                    }
                } else if (token.expires_at === null || now < token.expires_at!) {
                    // Subsequent use of JWT, the user has been logged in before
                    // access token has not expired yet
                    res = token
                } else {
                    // access token has expired, try to update it
                    res = await refreshAccessToken(
                        token,
                        String(process.env.GOOGLE_ID),
                        String(process.env.GOOGLE_SECRET),
                    )
                }

                return res
            },
            // @ts-ignore
            async session({
                token,
            }: {
                token: GenericObject
            }): Promise<GenericObject> {
                return Promise.resolve(token)
            },
        },
    }

    return NextAuth(req, res, options)
}

export default AuthHandler
