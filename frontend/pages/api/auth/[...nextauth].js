import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export const authOptions = {
    
  providers: [
    CredentialsProvider({
       
        name: "Credentials",
       
        credentials: { },
        async authorize(credentials, req) {
          const {username, password } = credentials;
          try{
            const user =  await axios.post('http://127.0.0.1:8000/user/login/',{
              username:username,
              password:password
            },
            {headers:
            {
               'Content-Type':'application/x-www-form-urlencoded',
               'Accept':'application/json'
            }})
            
          if (user) {
            return user.data;
          } else{ return null;}
          }
       catch (e) {
        throw new Error('Authentication failed');
        
      }
         
        }
      })
    
  ],

  session:{
    strategy:"jwt",
  },

  pages: {
    signIn: "../../login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user};
    },
    async session({ session, token,user}) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
    
    async onError(error,context) {
      if (error.message === 'Authentication failed') {
        throw new Error('Invalid username or password');
      }

       res.status(200).json({ error: error.message });
      const { req, res } = context;
      console.log('Request URL:', req.url);
      console.log('Response status code:', res.statusCode);
      throw error;
    },
  }
};

export default NextAuth(authOptions)