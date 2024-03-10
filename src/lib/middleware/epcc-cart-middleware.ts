import { NextRequest, NextResponse } from "next/server";
import { NextResponseFlowResult } from "./middleware-runner";
import { tokenExpired } from "../token-expired";
import { createAuthenticationErrorUrl } from "./create-missing-environment-variable-url";

export const epccEndpoint = process.env.NEXT_PUBLIC_EPCC_ENDPOINT_URL;
const clientId = process.env.NEXT_PUBLIC_EPCC_CLIENT_ID;
const cookiePrefixKey = process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY;


export async function epccCartMiddleware(
  req: NextRequest,
  previousResponse: NextResponse
): Promise<NextResponseFlowResult> {

  const possibleImplicitCookie = req.cookies.get(cookiePrefixKey + "_ep_cart");
  if (possibleImplicitCookie) {
    return {
      shouldReturn: false,
      resultingResponse: previousResponse,
    };
  }

  const authToken = retrieveAuthToken(req, previousResponse);

  if (!authToken) {
    return {
      shouldReturn: true,
      resultingResponse: NextResponse.redirect(
        createAuthenticationErrorUrl(
          `Cart cookie creation failed in middleware because credentials \"${cookiePrefixKey}_ep_credentials\" cookie was missing.`,
          req.nextUrl.origin,
          req.url,
        ),
      ),
    };
  }

  if (!authToken.access_token) {
    return {
      shouldReturn: true,
      resultingResponse: NextResponse.redirect(
        createAuthenticationErrorUrl(
          `Cart cookie creation failed in middleware because credentials \"access_token\" was undefined.`,
          req.nextUrl.origin,
          req.url,
        ),
      ),
    };
  }

  const createdCart: any = await fetch(`https://${epccEndpoint}/v2/carts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { name: "Cart" } }),
  });

  const response = await createdCart.json();

  previousResponse.cookies.set(cookiePrefixKey + "_ep_cart",
    response.data.id,
    {
      sameSite: "strict",
    }
  );

  return {
    shouldReturn: false,
    resultingResponse: previousResponse,
  };
}


function retrieveAuthToken(
  req: NextRequest,
  resp: NextResponse,
): { access_token: string; expires: number } | undefined {
  const authCookie =
    req.cookies.get(`${cookiePrefixKey}_ep_credentials`) ??
    resp.cookies.get(`${cookiePrefixKey}_ep_credentials`);

  const possiblyParsedCookie = authCookie && JSON.parse(authCookie.value);

  return possiblyParsedCookie && tokenExpired(possiblyParsedCookie.expires)
    ? undefined
    : possiblyParsedCookie;
}
