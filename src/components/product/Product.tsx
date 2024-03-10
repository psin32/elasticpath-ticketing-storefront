'use client'

import { useEffect, useState } from "react";
import { getNodesByIds, getProductById } from "../../services/products";
import { isChildProductResource, isSimpleProductResource } from "@/lib/product-helper";
import { retrieveBaseProps, retrieveChildProps, retrieveSimpleProps } from "@/lib/retrieve-product-props";
import BaseProductDetail from "./BaseProduct";
import ChildProductDetail from "./ChildProduct";
import SimpleProductDetail from "./SimpleProduct";
import { Node, ShopperCatalogResourcePage } from "@moltin/sdk";

interface IProductParam {
  productId: string;
}

export default function Product({ productId }: IProductParam) {

  const [product, setProduct] = useState<any>();
  const [breadcrumb, setBreadcrumb] = useState<Node[]>();

  useEffect(() => {
    const init = async () => {
      const product = await getProductById(productId)
      const productData = product.data;
      const breadCrumNode = productData.meta.bread_crumb_nodes[0]
      const nodeIds: string[] = []
      const parentNodes = productData.meta.bread_crumbs[breadCrumNode].reverse()
      nodeIds.push(breadCrumNode, ...parentNodes)
      const response: Node[] | undefined = await getNodesByIds(nodeIds)
      setBreadcrumb(response)

      const retrievedResults = isSimpleProductResource(productData)
        ? retrieveSimpleProps(product)
        : isChildProductResource(productData)
          ? await retrieveChildProps(product)
          : await retrieveBaseProps(product);
      setProduct(retrievedResults)
    };
    init();
  }, []);

  function resolveProductDetailComponent() {
    switch (product.props.kind) {
      case "base-product":
        return <BaseProductDetail baseProduct={product.props} breadcrumb={breadcrumb} />;
      case "child-product":
        return <ChildProductDetail childProduct={product.props} breadcrumb={breadcrumb} />;
      case "simple-product":
        return <SimpleProductDetail simpleProduct={product.props} breadcrumb={breadcrumb} />;
    }
  }

  return (
    product && resolveProductDetailComponent()
  )
}
