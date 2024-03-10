import type { ProductResponse } from "@moltin/sdk";
import { useContext } from "react";
import { ProductContext } from "../../lib/product-util";

interface IProductSummary {
  product: ProductResponse;
  bundlePrice?: string;
}

const ProductSummary = ({ product, bundlePrice }: IProductSummary): JSX.Element => {
  const {
    attributes,
    meta: { display_price, original_display_price },
  } = product;
  const context = useContext(ProductContext);

  return (
    <>
      <div className="lg:col-span-2 lg:pr-8 mb-5">
        <h1 className="text-4xl tracking-tight text-gray-900 sm:text-4xl">{attributes.name}</h1>
      </div>
      <p className="text-sm text-gray-900 mt-4">{attributes.sku}</p>
      <div className="text-2xl text-gray-900 mt-4">
        <span className={`${original_display_price?.without_tax.formatted ? 'text-red-600 mr-2' : 'text-black'}`}>{bundlePrice ? bundlePrice : display_price?.without_tax?.formatted}</span>
        {original_display_price?.without_tax.formatted && (
          <span className="line-through text-gray-700 text-xl">
            {original_display_price?.without_tax.formatted}
          </span>
        )}
      </div>
    </>
  );
};

export default ProductSummary;
