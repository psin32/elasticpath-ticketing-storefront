import type {
    AccountTokenBase,
    ResourcePage,
} from "@moltin/sdk";
import { Moltin as EPCCClient } from "@moltin/sdk";
import { epccServerClient } from "@/lib/epcc-server-client";


export async function getCatalogRules(
    client?: EPCCClient
): Promise<ResourcePage<AccountTokenBase>> {
    return (client ?? epccServerClient).Catalogs.Rules.All().catch((err) => { return err });
}
