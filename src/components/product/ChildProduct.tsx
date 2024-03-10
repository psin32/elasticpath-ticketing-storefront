import type { IChildProduct } from "../../types/product-types";
import ProductVariations from "./ProductVariations";
import ProductContainer from "./ProductContainer";
import { Node } from "@moltin/sdk";

interface IChildProductDetail {
  childProduct: IChildProduct;
  breadcrumb: Node[] | undefined;
}

const ChildProductDetail = ({
  childProduct,
  breadcrumb,
}: IChildProductDetail): JSX.Element => {
  const { product, baseProduct, variations, variationsMatrix } = childProduct;
  return (
    <ProductContainer productBase={childProduct} breadcrumb={breadcrumb}>
      {variations && (
        <ProductVariations
          variations={variations}
          variationsMatrix={variationsMatrix}
          baseProductSlug={baseProduct.attributes.slug}
          currentSkuId={product.id}
        />
      )}
    </ProductContainer>
  );
};

export default ChildProductDetail;
