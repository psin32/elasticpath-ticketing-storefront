import CognitoProvider from "next-auth/providers/cognito";
import { JWT } from "next-auth/jwt";

export const authOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.AWS_COGNITO_CLIENT_ID || "",
            clientSecret: process.env.AWS_COGNITO_CLIENT_SECRET || "",
            issuer: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USERPOOL_ID}`,
            idToken: true,
        })
    ],
    callbacks: {
        jwt: async ({
            token,
            user,
            account
        }: {
            token: JWT;
            user?: any;
            account?: any
        }) => {
            if (account && user) {
                // const cookies = new Cookies(req, res);
                // cookies.set('idToken', account?.id_token);
                return {
                    name: token.name,
                    email: token.email,
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + account.expires_at! * 1000,
                    refreshToken: account.refresh_token,
                };
            }
            return token;
        },
    },
}