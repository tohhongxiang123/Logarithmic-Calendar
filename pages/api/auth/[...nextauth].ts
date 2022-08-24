import { JWTInput } from "google-auth-library"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    pages: {
        signIn: '/auth/sign-in'
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account?.access_token) {
                token.accessToken = account.access_token
            }

            return token
        }
    }
})