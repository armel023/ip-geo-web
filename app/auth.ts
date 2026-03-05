import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserData } from "@/app/_dtos/user-data";

const apiUrl = process.env.IP_GEO_API_URL || "http://localhost:5069";
export const {handlers, signIn, signOut, auth }= NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Attempting to authenticate user:", credentials?.username);
        try {
          const url = `${apiUrl}api/Login`;
          console.log("Authentication URL:", url);
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
          if (res.status === 200) {
            const data = await res.json();
            if (data?.accessToken) {
              return {
                id: data.username,
                name: data.username,
                accessToken: data.accessToken,
              } as UserData;
            }
          }
          return null;
        } catch (error) {
            console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as UserData).accessToken;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
});