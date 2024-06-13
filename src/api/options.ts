import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                const user = { id: 1, name: credentials?.username, email: "abdo@example.com" };
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt", // Keep JWT strategy (default)
      },
    jwt:{
        maxAge: 60 * 60 * 24 * 30,
    }
}