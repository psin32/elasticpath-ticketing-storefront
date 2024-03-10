
export async function callShopifyAPI({ query, variables }: any) {
    const result = await fetch(`https://${process.env.SHOPIFY_STORE_IDENTIFIER}.myshopify.com/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token':
                    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
            },
            body: JSON.stringify({ query, variables }),
        },
    );

    if (!result.ok) {
        console.error(result);
        return false;
    }
    const { data } = await result.json();
    return data;
}
