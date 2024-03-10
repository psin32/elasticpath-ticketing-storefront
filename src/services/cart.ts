import { callShopifyAPI } from "@/lib/shopify-client";
import type { CartItemsResponse } from "@moltin/sdk"
import type {
    Cart,
    CartIncluded,
    CreateCartObject,
    Resource,
    ResourceIncluded,
} from "@moltin/sdk";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";
import { Moltin as EPCCClient } from "@moltin/sdk";

export async function createNewCart(
    client?: EPCCClient
): Promise<Resource<Cart>> {
    const request: CreateCartObject = {
        name: "Cart",
        description: "Cart"
    }

    return (client ?? getEpccImplicitClient()).Cart().CreateCart(request);
}

export async function getCart(
    cartId: string,
    client?: EPCCClient
): Promise<ResourceIncluded<Cart, CartIncluded>> {
    return (client ?? getEpccImplicitClient()).Cart(cartId).With("items").Get()
}

export async function addProductToCart(
    cartId: string,
    productId: string,
    quantity: number,
    client?: EPCCClient
): Promise<CartItemsResponse> {
    return (client ?? getEpccImplicitClient()).Cart(cartId).With("items").AddProduct(productId, quantity)
}

export interface CustomItemRequest {
    type: "custom_item";
    name: string;
    quantity: number;
    price: {
        amount: number;
        includes_tax?: boolean;
    };
    sku?: string;
    description?: string;
    custom_inputs?: Record<string, any>;
}

export async function addCustomItemToCart(
    cartId: string,
    customItem: CustomItemRequest,
    client?: EPCCClient
): Promise<CartItemsResponse> {
    return (client ?? getEpccImplicitClient()).Cart(cartId)
        .AddCustomItem(customItem)
}

export async function removeCartItem(
    id: string,
    itemId: string,
    client?: EPCCClient
): Promise<CartItemsResponse> {
    return (client ?? getEpccImplicitClient()).Cart(id).RemoveItem(itemId)
}

export async function removeAllCartItems(
    id: string,
    client?: EPCCClient
): Promise<CartItemsResponse> {
    return (client ?? getEpccImplicitClient()).Cart(id).RemoveAllItems()
}

export async function updateCartItem(
    id: string,
    productId: string,
    quantity: number,
    client?: EPCCClient
): Promise<CartItemsResponse> {
    return (client ?? getEpccImplicitClient()).Cart(id).UpdateItem(productId, quantity)
}

export async function addPromotion(
    id: string,
    promoCode: string,
    client?: EPCCClient
): Promise<CartItemsResponse> {
    return (client ?? getEpccImplicitClient()).Cart(id).AddPromotion(promoCode)
}
