import Header from "@/components/header/Header";
import Product from "@/components/product/Product";
import { config } from "@/constant/config";
import { getProductById } from "@/services/products";
import type { Metadata, ResolvingMetadata } from 'next'

type IProduct = {
  params: { productId: string }
}

export async function generateMetadata(
  { params }: IProduct,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.productId
  const product = await getProductById(id)
  return {
    title: product.data.attributes.name + " - " + config.title,
    description: product.data.attributes.description,
    robots: { index: true, follow: true },
  }
}

export default function Products({ params }: IProduct) {
  return (
    <main className="flex flex-col justify-between">
      <Header />
      <Product productId={params.productId} ></Product>
    </main>
  )
}
