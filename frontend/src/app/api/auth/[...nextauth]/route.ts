import { BACKEND_URL } from "@/lib/Constants";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CreadentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CreadentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials, req){

                console.log("red")

                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                console.log("qqqqqqqqqqqqqqq")
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                try {
                    const res = await axios.post(`${backendUrl}/api/auth/login`, {
                        username,
                        password,
                    });

                    const data = res.data;

                    console.log("✅ Login successful:", data);
                    return data; // must include at least a `user` object

                } catch (error: any) {
                    /*
                    if (axios.isAxiosError(error)) {
                        console.error("❌ Login error:", error.response?.status, error.response?.data);
                    } else {
                        console.error("❌ Unexpected error:", error);
                    }
                    */
                    return null;
                }

                /*
                const res = await fetch(BACKEND_URL + "/auth/login",{
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                    },
                });
                if (res.status  == 401){
                    console.log(res.statusText);
                    console.log("dddd")
                    return null;
                }


                const user = await res.json();
                */
                //return res.data.user //user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user}){
            console.log({token, user});
            if (user) return { ...token, ...user};

            return token;
        },
        async session({token, session}){
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
    pages: {
      signIn: '/'
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};