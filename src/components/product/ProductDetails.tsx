import type { ProductResponse } from "@moltin/sdk";
import { useContext } from "react";
import { ProductContext } from "../../lib/product-util";

interface IProductDetails {
  product: ProductResponse;
}

const ProductDetails = ({ product }: IProductDetails): JSX.Element => {
  const context = useContext(ProductContext);
  return (
    <>
      {product.attributes.description && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 uppercase mb-3">Product Details</h3>
          <div className="space-y-6">
            <p className="text-base text-gray-600 leading-7">{product.attributes.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
