import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDb from "../../../../../utils/dbConnection";
import User from "../../../../../models/userModels";
import bcrypt from "bcrypt";

async function login(credentials:Credentials) {
  try{
    await connectMongoDb();
    const user = await User.findOne({email:credentials?.email})
    if(!user) throw new Error("Invalid User Credentials")
    const isCorrect = await bcrypt.compare(credentials?.password, user?.password)
    if(!isCorrect) throw new Error("Invalid User Credentials");
    return user;
  }catch(err){
    throw new Error(err.message)
  }
}
export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id:"credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials); 
          console.log("user from auth route",{user})
          return user;
        } catch (error) {
          console.log( error.message );
          throw new Error (error.message)
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
      // console.log({token, user})
      if(user){
        token.username= user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}){
      // console.log({session, token})
      if(token){
        session.user.username=token.username;
        session.user.email=token.email;
        session.id=token.id;
      }
      return session;
    }
  }
};

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};