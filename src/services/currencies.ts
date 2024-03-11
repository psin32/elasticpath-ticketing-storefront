import type {
    Currency,
    ResourcePage,
} from "@moltin/sdk";
import { Moltin as EPCCClient } from "@moltin/sdk";
import { epccServerClient } from "@/lib/epcc-server-client";

export async function getAllCurrencies(
    client?: EPCCClient
): Promise<ResourcePage<Currency>> {
    return (client ?? epccServerClient).Currencies.All().catch((err) => { return err });
}
