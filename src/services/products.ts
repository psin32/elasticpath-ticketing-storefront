import type {
  File,
  Node,
  ProductResponse,
  ResourcePage,
  ShopperCatalogResource,
  ShopperCatalogResourcePage,
} from "@moltin/sdk";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";
import { Moltin as EPCCClient } from "@moltin/sdk";

export async function getProductById(
  productId: string,
  client?: EPCCClient
): Promise<ShopperCatalogResource<any>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.With([
    "main_image",
    "files",
    "component_products",
  ]).Get({
    productId,
  });
}

export async function getProductBySlugs(
  slugs: string[],
  client?: EPCCClient
): Promise<ShopperCatalogResource<ProductResponse[]>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.With([
    "main_image",
    "files",
    "component_products",
  ]).Filter({
    in: {
      slug: slugs.join(",")
    }
  }).All();
}

export async function getProductBySlug(
  slug: string,
  client?: EPCCClient
): Promise<ShopperCatalogResource<ProductResponse[]>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.With([
    "main_image",
    "files",
    "component_products",
  ]).Filter({
    eq: {
      slug,
    }
  }).All();
}

export async function getNodesByIds(
  nodeIds: string[],
  client?: EPCCClient
): Promise<Node[]> {
  nodeIds = nodeIds.reverse()
  const response: ShopperCatalogResourcePage<Node> = await (client ?? getEpccImplicitClient()).ShopperCatalog.Nodes.Filter({
    in: {
      id: nodeIds.join(",")
    }
  }).All();

  const nodes: Node[] = []
  for (const nodeId of nodeIds) {
    const node: Node | undefined = response.data.find(nd => nd.id == nodeId)
    node && nodes.push(node)
  }
  return nodes
}

export async function getImagesByIds(
  imageIds: string[],
  client?: EPCCClient
): Promise<ResourcePage<File>> {
  await (client ?? getEpccImplicitClient()).Files.Filter({
    in: {
      id: imageIds
    }
  }).All();
  return await (client ?? getEpccImplicitClient()).Files.Filter({
    in: {
      id: imageIds
    }
  }).All();
}

export function getAllProducts(
  client?: EPCCClient
): Promise<ShopperCatalogResourcePage<ProductResponse>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.Limit(0)
    .Offset(25)
    .All();
}

export async function configureBundle(
  productId: string,
  selectedOptions: any,
  client?: EPCCClient
): Promise<ShopperCatalogResource<ProductResponse>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.Configure({ productId, selectedOptions });
}