import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
      signIn: "/login",
  },
  session: {
      strategy: "jwt",
  },
  trustHost: true,
  providers: [
    Credentials({
          name: "Credentials",
          credentials: {
            usuario: { label: "Usuário", type: "text" },
            senha: { label: "Senha", type: "password" }
          },
          authorize: async (credentials) => {
            const url = process.env.NEXT_PUBLIC_API;
            const res = await fetch(url+"/api/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario: credentials?.usuario,
                    senha: credentials?.senha,
                }),
            });

            if (!res.ok) { console.error("Erro na autenticação:", res.status, res.statusText); }

            const user = await res.json();
    
            if (res.ok && user) {
                return user;
            } else {
                throw new Error("Invalid credentials.");
            }
        },
      })
  ],
  callbacks: {
      async jwt({ token, user }) {
          return { ...token, ...user };
      },
      async session({ session, token }) {
          session.user = token as any;
          return session;
      },
  },
})