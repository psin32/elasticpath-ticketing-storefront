import { ISimpleProduct } from "@/types/product-types";
import ProductContainer from "./ProductContainer";
import ProductComponents from "./ProductComponents";
import { Node } from "@moltin/sdk";
import { useState } from "react";
import { CartItem, CartLineItem } from "@/lib/hooks/cart";

interface ISimpleProductDetail {
  simpleProduct: ISimpleProduct;
  breadcrumb: Node[] | undefined;
}

const SimpleProductDetail = ({
  simpleProduct,
  breadcrumb,
}: ISimpleProductDetail): JSX.Element => {
  const [bundlePrice, setBundlePrice] = useState<string>();
  const [bundleItems, setBundleItems] = useState<CartItem>()

  const { product, component_products } = simpleProduct;
  return (
    <ProductContainer productBase={simpleProduct} breadcrumb={breadcrumb} bundlePrice={bundlePrice} bundleItems={bundleItems}>
      {component_products && (
        <ProductComponents product={product} components={component_products} setBundlePrice={setBundlePrice} setBundleItems={setBundleItems} />
      )}
    </ProductContainer>
  );
};

export default SimpleProductDetail;
