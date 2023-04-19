import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      encryption: true,
    },
  },
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "a@b.c" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, userId } = credentials;
        return {id: userId, email: email, name: userId};
      }
    })
  ],

}

export default NextAuth(authOptions)