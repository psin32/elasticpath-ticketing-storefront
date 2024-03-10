import type {
  AccountTokenBase,
  ResourcePage,
} from "@moltin/sdk";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";
import { Moltin as EPCCClient, AccountManagementAuthenticationTokenBody } from "@moltin/sdk";
import { epccServerClient } from "@/lib/epcc-server-client";

export async function login(
  username: string,
  password: string,
  client?: EPCCClient
): Promise<ResourcePage<AccountTokenBase>> {
  const request: AccountManagementAuthenticationTokenBody = {
    type: "account_management_authentication_token",
    authentication_mechanism: "password",
    password,
    username,
    password_profile_id: process.env.NEXT_PUBLIC_EPCC_PASSWORD_PROFILE || ""
  }
  return (client ?? getEpccImplicitClient()).AccountMembers.GenerateAccountToken(request).catch((err) => { return err });
}

export async function signup(
  username: string,
  password: string,
  name: string,
  client?: EPCCClient
): Promise<ResourcePage<AccountTokenBase>> {
  const request = {
    type: "account_management_authentication_token",
    authentication_mechanism: "self_signup",
    password,
    username,
    name,
    email: username,
    password_profile_id: process.env.NEXT_PUBLIC_EPCC_PASSWORD_PROFILE || ""
  }
  return (client ?? getEpccImplicitClient()).AccountMembers.GenerateAccountToken(request).catch((err) => { return err });
}

export async function getAccountMemberDetails(
  accountMemberId: string,
  client?: EPCCClient
): Promise<ResourcePage<AccountTokenBase>> {
  return (client ?? epccServerClient).AccountMembers.Get(accountMemberId).catch((err) => { return err });
}

export async function getAccountAddresses(
  accountId: string,
  token: string,
  client?: EPCCClient
): Promise<ResourcePage<AccountTokenBase>> {
  return (client ?? getEpccImplicitClient()).AccountAddresses.All({ account: accountId, token }).catch((err) => { return err });
}
