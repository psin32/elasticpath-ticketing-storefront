
export function getInitialState(
  cart?: any
): any {
  if (!cart) {
    return {
      kind: "uninitialised-cart-state"
    }
  }

  if (!cart.included?.items) {
    return {
      kind: "empty-cart-state",
      id: cart.data.id
    }
  }

  return {
    kind: "present-cart-state",
    items: [],
    meta: "",
    id: cart.data.id,
  }
}
