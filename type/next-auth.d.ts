import { DefaultSession, DefaultJWT, User as NextAuthUser} from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    username?: string | null; 
    role?: string;           
    acc_level?: number;      
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string | null;
      role: string
      acc_level: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    username?: string | null;
    email?: string | null;
    role?: string | null;
    acc_level?: number;
  }
}