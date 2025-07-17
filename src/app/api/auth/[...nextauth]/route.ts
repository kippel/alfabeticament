import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma  from "@/lib/prisma";
import bcrypt from "bcryptjs"


const handler = NextAuth({
    providers: [
      CredentialsProvider({
          name: 'credentials',
          credentials: {
            name: { label: "Name", type: "text", placeholder: "jsmith"},
            password: { label: "Password", type: "password", placeholder: "********" }
          },
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
          // @ts-ignore
          async authorize(credentials, req) {
            console.log("authorizing")
            
            
            if (!credentials?.name) throw new Error("Name is required");

            const result = await prisma.user.findUnique({
              where: { name: credentials.name }
            });

            
            console.log(result)
            ///console.log(result)
            if (!result) throw new Error("Invalid")
            
            const passwordM = await bcrypt.compare(credentials!.password, result.password) 

            //const passwordM = await bcrypt.compare(credentials!.password, result.password)  
            if (!passwordM) throw new Error("Invalid")
            
            return {
              id: result.id,
              user: result.name
            };
            
          },
      }),
    ],
    callbacks: {
      jwt({account, token, user, profile, session}){
        /*
        console.log({
          account,
          token,
          user,
          profile
        })
        */
        if (user) token.user = user;
        //console.log(user)
        //console.log("ddddddddddd")
        return token
      },
      session({session, token}){
        //console.log({session, token})
        session.user = token.user as any;
        return session;
      },
    },
    pages: {
      signIn: '/login'
    },
    
});

export { handler as GET, handler as POST }