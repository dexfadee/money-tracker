import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import dbConnect from "./lib/dbConnect";
import User from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  callbacks: {
    signIn: async ({ user }) => {
      try {
        const { email, name, image, id } = user;
        await dbConnect();
        const alreadyUser = await User.findOne({ email });

        if (!alreadyUser) {
          await User.create({ email, name, image, authProviderId: id });
          return true;
        } else {
          return true;
        }
      } catch (error) {
        throw new Error("Error while creating user");
      }
    },
  }
})