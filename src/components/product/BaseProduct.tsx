import { IBaseProduct } from "../../types/product-types";
import ProductVariations from "./ProductVariations";
import ProductContainer from "./ProductContainer";
import { Node } from "@moltin/sdk";

interface IBaseProductDetail {
  baseProduct: IBaseProduct;
  breadcrumb: Node[] | undefined;
}

const BaseProductDetail = ({
  baseProduct,
  breadcrumb,
}: IBaseProductDetail): JSX.Element => {
  const {
    product: { attributes, id },
    variations,
    variationsMatrix,
  } = baseProduct;
  return (
    <ProductContainer productBase={baseProduct} breadcrumb={breadcrumb}>
      {variations && (
        <ProductVariations
          variations={variations}
          variationsMatrix={variationsMatrix}
          baseProductSlug={attributes.slug}
          currentSkuId={id}
        />
      )}
    </ProductContainer>
  );
};

export default BaseProductDetail;
