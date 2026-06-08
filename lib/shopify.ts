const STORE_DOMAIN = "nsvi1g-nm.myshopify.com"

// Redirects to Shopify cart → Shopify handles payment, orders, shipping
export function getCartUrl(variantId: string, qty = 1): string {
  return `https://${STORE_DOMAIN}/cart/${variantId}:${qty}`
}

// Direct checkout (skips cart page)
export function getCheckoutUrl(variantId: string, qty = 1): string {
  return `https://${STORE_DOMAIN}/cart/${variantId}:${qty}?checkout=1`
}
