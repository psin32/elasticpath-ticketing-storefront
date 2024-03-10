import { getProductBySlugs } from "@/services/products";

import { config } from "@/constant/config";
import { ProductResponse } from "@moltin/sdk";
import { getHomePageContent } from "@/services/storyblok";
import Content from "./Content";
import { cookies } from "next/headers";

export default async function LandingPage() {
    const cookieStore = cookies()
    const locale = cookieStore.get("locale")?.value || "en";
    const content = await getHomePageContent(locale)
    const products = await getProductBySlugs(config.featuredProducts)

    const getMainImage = (imageId: string | undefined) => {
        if (imageId && products.included?.main_images) {
            return products.included?.main_images.find(image => image.id == imageId)?.link.href
        }
    }
    return (
        <>
            <Content content={content}></Content>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.data.map((product: ProductResponse) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={getMainImage(product?.relationships?.main_image?.data?.id)}
                                        alt=""
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={`/products/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.attributes.name}
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.meta.display_price?.without_tax.formatted}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
