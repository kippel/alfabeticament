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

                
                // TODO: user
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                

                const params = new URLSearchParams();
                params.append("username", username);
                params.append("password", password);

                const res = await axios.post(`${backendUrl}/auth/token`, params, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });


                /*
                const res = await axios.post(`${backendUrl}/auth/login`, {
                        username,
                        password,
                });
                */

                const data = res.data;

                console.log("✅ Login successful:", data);



                //return data; // must include at least a `user` object
                
                return {
                    token: data.access_token,
                    accessToken: data.access_token
                };

                
                //return res.data.user //user;
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user){
                token.accessToken = user.accessToken;
                
            } 
            
            return token;

        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            
            return session;
        }
    },
    pages: {
      signIn: '/' 
    },




};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};
