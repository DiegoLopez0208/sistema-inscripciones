import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                        credentials: "include", // Permite recibir y enviar cookies del backend
                    });
                    if (!res.ok) throw new Error("Login fallido");

                    const user = await res.json();
                    console.log(user)
                    return user; // Retorna el usuario si `data.user` coincide con la interfaz User
                } catch (error) {
                    console.error("Authentication failed:", error);
                    return null; // Fallo en la autorización
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === "google") {

                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verifyGoogle`,
                        { id_token: account.id_token },
                        { headers: { "Content-Type": "application/json" } });

                    if (res.status === 200) {// @ts-ignore
                        if (res?.user) {// @ts-ignore
                            token.id = res.user.id;// @ts-ignore
                            token.role = res.user.role// @ts-ignore
                            token.email = res.user.email;// @ts-ignore
                            token.name = res.user.name;// @ts-ignore
                        }
                    }
                } catch (error) {
                    console.error("Error checking user existence:", error);
                }
            } else {
                if (user) {
                    token.id = user.id;
                    token.role = (user as any).role;
                    token.email = user.email;
                    token.name = user.name;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session && session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
                (session.user as any).role = (token as any).role;
                (session.user as any).id = (token as any).id;
            }
            return session;
        },
    },

};


// Crea el handler para NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
