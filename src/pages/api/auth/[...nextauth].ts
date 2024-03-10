import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import Cookies from 'cookies';
import { getAccountMemberDetails, login, signup } from "@/services/accounts";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'credentials',
      id: "credentials",
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'prashant.singh@elasticpath.com',
        },
        password: { label: 'Password', type: 'password' },
        type: { label: 'Type', type: 'string' },
        name: { label: 'Name', type: 'string' }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid request");
        }

        let response: any = null
        if (credentials?.type === "login") {
          response = await login(credentials?.email, credentials?.password)
          if (response.errors) {
            throw new Error(response.errors[0].detail);
          }
        }

        if (credentials?.type === "registration") {
          response = await signup(credentials?.email, credentials?.password, credentials?.name)
          if (response.errors) {
            throw new Error(response.errors[0].detail);
          }
        }

        const accountMemberResponse = await getAccountMemberDetails(response.meta.account_member_id)
        response.member_details = accountMemberResponse.data
        return response;
      },
    }),
  ]

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      async jwt({ token, user, account }: any) {
        if (account && user) {
          const cookies = new Cookies(req, res);
          cookies.set(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY}_account_member_id`, user.meta.account_member_id);
          cookies.set(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY}_account_id`, user.data[0].account_id);
          cookies.set(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY}_account_access_token`, user.data[0].token);
          return {
            name: user.member_details.name,
            email: user.member_details.email,
            accessToken: user.data[0].token,
            accessTokenExpires: user.data[0].expires,
          };
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60 // 24 hours
    },
  })
}