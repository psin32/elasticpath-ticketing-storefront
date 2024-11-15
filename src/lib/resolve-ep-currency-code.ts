import { getCookie } from "cookies-next";

export const EP_CURRENCY_CODE = retrieveCurrency();

function retrieveCurrency(): string {
  const currencyInCookie = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY}_ep_currency`);
  return (
    (typeof currencyInCookie === "string"
      ? currencyInCookie
      : process.env.NEXT_PUBLIC_DEFAULT_CURRENCY_CODE) || "USD"
  );
}
