import { useContext } from "react"
import { StoreError } from "@/types/error-types"
import { StoreCartAction, StoreEvent } from "@/types/event-types"
import { CartItemsContext } from "./cart-context"
import { getCookie } from "cookies-next"
import { config } from "@/constant/config"
import { addProductToCart, removeCartItem, updateCartItem } from "@/services/cart"

export type Attributes = {
    key: string;
    value: string;
}

export interface CartLineItem {
    merchandiseId: string;
    quantity: number;
    optionId?: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    parentProductId?: string;
    lines?: CartLineItem[]
}

export function useCart() {
    const context = useContext(CartItemsContext)

    if (context === undefined) {
        throw new Error("useCartItems must be used within a CartProvider")
    }

    const { state, dispatch, emit } = context

    return {
        addProductToCart: _addProductToCart(dispatch, emit),
        updateCartItem: _updateCartItem(dispatch, emit),
        removeItem: _removeItem(dispatch, emit),
        isUpdatingCart: state.kind === "updating-cart-state",
        state
    }
}


function _addProductToCart(
    dispatch: (action: any) => void,
    eventEmitter?: (event: StoreEvent) => void
) {
    return async (item: CartItem): Promise<void> => {
        const cookieName = process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY + "_ep_cart"
        const cartId = getCookie(cookieName) || ""

        dispatch({
            type: "updating-cart",
            payload: { action: "add" }
        })

        try {
            const response = await addProductToCart(cartId, item.productId, item.quantity)

            dispatch({
                type: "update-cart",
                payload: {
                    id: cartId,
                    meta: response.meta,
                    items: response.data
                }
            })
            attemptEmitSuccess(
                "add-to-cart",
                `Added to cart`,
                eventEmitter
            )
        } catch (err) {
            dispatch({
                type: "failed-cart-update"
            })
            attemptEmitError(
                err,
                "add-to-cart",
                "Failed to add product to cart",
                eventEmitter
            )
            throw err
        }
    }
}

function _updateCartItem(
    dispatch: (action: any) => void,
    eventEmitter?: (event: StoreEvent) => void
) {
    return async (itemId: string, quantity: number): Promise<void> => {
        const cookieName = process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY + "_ep_cart"
        const cartId = getCookie(cookieName) || ""

        dispatch({
            type: "updating-cart",
            payload: { action: "update" }
        })

        try {
            const response = await updateCartItem(cartId, itemId, quantity)

            dispatch({
                type: "update-cart",
                payload: { id: cartId, meta: response.meta, items: response.data }
            })
            attemptEmitSuccess("update-cart", "Updated cart item", eventEmitter)
        } catch (err) {
            dispatch({
                type: "failed-cart-update"
            })
            attemptEmitError(
                err,
                "update-cart",
                "Failed to update product in cart",
                eventEmitter
            )
            throw err
        }
    }
}

function _removeItem(
    dispatch: (action: any) => void,
    eventEmitter?: (event: StoreEvent) => void
) {
    return async (lineId: string): Promise<void> => {
        const cookieName = process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY + "_ep_cart"
        const cartId = getCookie(cookieName) || ""

        dispatch({
            type: "updating-cart",
            payload: { action: "remove" }
        })

        try {
            const response = await removeCartItem(cartId, lineId)

            dispatch({
                type: "update-cart",
                payload: {
                    id: cartId,
                    items: response.data,
                    meta: response.meta,
                }
            })
            attemptEmitSuccess(
                "remove-from-cart",
                `Removed "${lineId}" to cart`,
                eventEmitter
            )
        } catch (err) {
            dispatch({
                type: "failed-cart-update"
            })
            attemptEmitError(
                err,
                "remove-from-cart",
                "Failed to remove product from cart",
                eventEmitter
            )
            throw err
        }
    }
}

function createError(err: unknown, msg: string): StoreError {
    if (err instanceof Error) {
        return {
            type: "cart-store-error",
            // @ts-ignore TODO
            cause: new Error(msg, { cause: err })
        }
    }

    return {
        type: "cart-store-error",
        cause: new Error(`${msg} - The cause of the error is unknown`)
    }
}

function attemptEmitError(
    err: unknown,
    action: StoreCartAction,
    msg: string,
    emitter?: (event: StoreEvent) => void
): void {
    if (emitter) {
        emitter({
            type: "error",
            scope: "cart",
            message: msg,
            action,
            cause: createError(err, msg)
        })
    }
}

function attemptEmitSuccess(
    action: StoreCartAction,
    msg: string,
    emitter?: (event: StoreEvent) => void
): void {
    if (emitter) {
        emitter({
            type: "success",
            scope: "cart",
            message: msg,
            action
        })
    }
}
