import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        //   check if user exist
        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
            console.log("=======not user exist")
          // create new user
          
          console.log("======profile", profile)
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }

        console.log("======user created")
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
