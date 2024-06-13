import {
    getUserByEmail,
    getUserByPhone,
    getUserByUsernamePass,
    updateUser
} from "@/lib/controllers/userController"
import { signJwtAccessToken } from "@/lib/jwt"
import connectToMongodb from "@/lib/mongodb"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'
import { TLoginMailSchema, TLoginSmsSchema, TLoginUsernameSchema, TUserSchema } from "@/ZSchemas/UserSchema"


export const authOptions: NextAuthOptions = {
    jwt: {
        maxAge: 1 * 24 * 60 * 60 // 1 days
    },
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60 // 1 days
    },
    providers: [
        CredentialsProvider({
            id: 'EmailCredentials',
            name: 'Email credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as TLoginMailSchema
                connectToMongodb()
                /* const parsed = {
                    email,
                    select: ['email', 'password', 'username', 'phone', 'displayName', 'verifyMail', 'role', 'accessToken']
                }
                const stringified = queryString.stringify(parsed)
                const users: TUserSchema[] = await getAllUsers(stringified)
                const user = users[0] */

                const user = await getUserByEmail(email) as TUserSchema
                if (!user) throw Error('ایمیل یا گذرواژه اشتباه است!')
                if (!user.verifyMail) throw Error('ابتدا باید حساب کاربری خود را فعال کنید!')
                const passwordMatch = await bcrypt.compare(password, user.password)
                if (!passwordMatch) throw Error('ایمیل یا گذرواژه اشتباه است!')
                const accessToken = signJwtAccessToken(user)
                return {
                    _id: user._id,
                    role: user.role,
                    email: user.email,
                    username: user.username,
                    accessToken: accessToken,
                    displayName: user.displayName,
                }
            },
        }),
        CredentialsProvider({
            id: 'UsernameCredentials',
            name: 'Username credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials as TLoginUsernameSchema
                connectToMongodb()
                const user = await getUserByUsernamePass(username) as TUserSchema
                // if (!user) {
                //     HandleEnqueueSnackbar({ msg: 'email/password mismatch', variant: 'error' })
                //     return null
                // }
                if (!user) throw Error('username/password mismatch')
                const passwordMatch = await bcrypt.compare(password, user.password)
                // if (!passwordMatch) {
                //     HandleEnqueueSnackbar({ msg: 'email/password mismatch', variant: 'error' })
                //     return null
                // }
                if (!passwordMatch) throw Error('username/password mismatch')
                const accessToken = signJwtAccessToken(user)
                return {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    accessToken: accessToken
                }
            },
        }),
        CredentialsProvider({
            id: 'UserPhoneCredentials',
            name: 'UserPhone credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { phone, verifyPKey } = credentials as TLoginSmsSchema
                connectToMongodb()
                const user = await getUserByPhone({ phone }) as TUserSchema
                if (!user) {
                    // HandleEnqueueSnackbar({ msg: 'password mismatch', variant: 'error' })
                    return null
                }
                if (!user) throw Error('password mismatch')
                const passwordMatch = await bcrypt.compare(verifyPKey, user.verifyPKey)
                if (!passwordMatch) {
                    // HandleEnqueueSnackbar({ msg: 'password mismatch', variant: 'error' })
                    return null
                }
                if (!passwordMatch) throw Error('password mismatch')

                user.verifyPhone === false && await updateUser(user._id, {
                    data: {
                        verifyPhone: true
                    }
                })
                const accessToken = signJwtAccessToken(user)
                return {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    displayName: user.displayName,
                    role: user.role,
                    accessToken: accessToken
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session, trigger, account, profile }) {
            if (trigger === 'update' && session.user) {
                return {
                    ...token,
                    ...session.user
                }
            }
            if (user) {
                return {
                    ...token,
                    ...user
                }
            }
            return token
        },
        async session({ session, token, user, trigger, newSession }) {
            session.user = token as any
            return session
        }
    },
    pages: {
        signIn: '/phone',
        error: '/mail',
        signOut: '/',
        verifyRequest: '/',
        newUser: '/dashboard'
    },
    secret: process.env.NEXTAUTH_CECRET

}

const authHandler = NextAuth(authOptions)
export { authHandler as GET, authHandler as POST }

/* const session = await unstable_getServerSession(req, res, authOptions)
if (session) {
  // Signed in
  console.log("Session", JSON.stringify(session, null, 2))
} else {
  // Not Signed in
  res.status(401)
}  */