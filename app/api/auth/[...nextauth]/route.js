import NextAuth from "next-auth/next";
import GooogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GooogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
    
            return session;
        }, 
        async signIn({profile}) {
            try {
                await connectToDB()
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        userName: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
    
                return true
            } catch(err) {
                console.log(err)
                return false
            }
        }
    },
})

export { handler as GET, handler as POST };