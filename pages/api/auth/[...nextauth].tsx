import NextAuth, { User, Session, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../lib/db";
import { comparePassword } from "../../../lib/auth";

// type ExtendedUserType = User & { username?: string; uid?: string };
// sign in with credentials:
// https://www.youtube.com/watch?v=EFucgPdjeNg&list=PLaAoUJDWH9Wp_44sMdkrqhF80tmL8DUTz
// https://www.youtube.com/watch?v=ollnut-J47s&list=PLaAoUJDWH9Wp_44sMdkrqhF80tmL8DUTz&index=2

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        // email and password can also be get from credentials.
        let client;
        const { email, password } = req.body as {
          email: string;
          password: string;
        };

        if (
          !email.includes("@") ||
          email.trim().length < 6 ||
          password.trim().length < 6 ||
          !password
        ) {
          throw new Error("invalid email and password");
        }

        try {
          client = await connectDB();
        } catch (err) {
          throw new Error("cannot connect to db");
        }

        try {
          const db = client.db();
          const user = await db.collection("users").findOne({ email });

          if (!user) {
            throw new Error("user not found");
          }

          const isValidPassword = await comparePassword(
            password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("incorrect password");
          }

          return {
            image:
              "https://th.bing.com/th/id/R.fc15c272ac709ac76e60d0898f65c3b6?rik=OQgMi36FGaP4fA&pid=ImgRaw&r=0",
            uid: user._id.toString(),
            name: user.name,
            email,
          };
        } catch (err) {
          throw new Error("invalid email or password");
        }

        if (client) {
          client.close();
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt(params) {
      if (params.user?.uid) {
        params.token.uid = params.user.uid;
      }

      if (params.user?.image) {
        params.token.image = params.user.image;
      }
      // final received token
      return params.token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }) {
      session.user!.username = session.user?.name
        ?.split(" ")
        .join("")
        .toLocaleLowerCase();

      // for sign in with google
      // session.user.uid = token.sub;

      console.log(token);
      console.log(session);
      session.user!.uid = token?.uid as string;

      if (!session.user.uid) {
        session.user.uid = token.sub;
      }

      session.user!.image = token?.image as string;

      return session;
    },
  },
};
export default NextAuth(authOptions);
