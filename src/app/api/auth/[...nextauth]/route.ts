import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username: ",
                    type: "text",
                },
                password: {
                    label: "Password: ",
                    type: "password"
                },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null
                }
                
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    },
                });

                if (user) {
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password) 
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Wrong Credentials")
                    }
                } else {
                    throw new Error("User not found!")
                }
                
            }
        })
    ],
    pages: {
        error: '/login',
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },

        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }