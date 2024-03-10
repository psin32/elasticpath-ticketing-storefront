'use client'

import type { CatalogsProductVariation } from "@moltin/sdk";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { OptionDict, ProductContextState, ProductModalContextState } from "../../types/product-types";
import {
  allVariationsHaveSelectedOption,
  getOptionsFromSkuId,
  getSkuIdFromOptions,
  mapOptionsToVariation,
} from "../../lib/product-helper";
import ProductVariationStandard, {
  UpdateOptionHandler,
} from "./variations/ProductVariationStandard";
import ProductVariationColor from "./variations/ProductVariationColor";
import { MatrixObjectEntry } from "../../types/matrix-object-entry";
import { createContext } from "react";

interface IProductVariations {
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
  baseProductSlug: string;
  currentSkuId: string;
  skuOptions?: string[];
}

export const createEmptyOptionDict = (
  variations: CatalogsProductVariation[]
): OptionDict =>
  variations.reduce((acc, c) => ({ ...acc, [c.id]: undefined }), {});

export const ProductContext = createContext<ProductContextState | null>(null);
export const ProductModalContext =
  createContext<ProductModalContextState | null>(null);

const getSelectedOption = (
  variationId: string,
  optionLookupObj: OptionDict
): string => {
  return optionLookupObj[variationId];
};

const ProductVariations = ({
  variations,
  baseProductSlug,
  currentSkuId,
  variationsMatrix,
}: IProductVariations): JSX.Element => {
  const currentSkuOptions = getOptionsFromSkuId(currentSkuId, variationsMatrix);
  const initialOptions = currentSkuOptions
    ? mapOptionsToVariation(currentSkuOptions, variations)
    : createEmptyOptionDict(variations);

  const context = useContext(ProductContext);
  const [selectedOptions, setSelectedOptions] =
    useState<OptionDict>(initialOptions);
  const router = useRouter();

  useEffect(() => {
    const selectedSkuId = getSkuIdFromOptions(
      Object.values(selectedOptions),
      variationsMatrix
    );

    if (
      !context?.isChangingSku &&
      selectedSkuId &&
      selectedSkuId !== currentSkuId &&
      allVariationsHaveSelectedOption(selectedOptions, variations)
    ) {
      context?.setIsChangingSku(true);
      router.push(`/products/${selectedSkuId}`)
    }
  }, [
    selectedOptions,
    baseProductSlug,
    context,
    currentSkuId,
    router,
    variations,
    variationsMatrix,
  ]);

  const updateOptionHandler: UpdateOptionHandler =
    (variationId) =>
      (optionId): void => {
        for (const selectedOptionKey in selectedOptions) {
          if (selectedOptionKey === variationId) {
            setSelectedOptions({
              ...selectedOptions,
              [selectedOptionKey]: optionId,
            });
            break;
          }
        }
      };

  return (
    <div>
      {variations.map((v) =>
        resolveVariationComponentByName(
          v,
          updateOptionHandler,
          getSelectedOption(v.id, selectedOptions)
        )
      )}
    </div>
  );
};

function resolveVariationComponentByName(
  v: CatalogsProductVariation,
  updateOptionHandler: UpdateOptionHandler,
  selectedOptionId?: string
): JSX.Element {
  switch (v.name.toLowerCase()) {
    case "color":
      return (
        <ProductVariationColor
          key={v.id}
          variation={v}
          updateOptionHandler={updateOptionHandler}
          selectedOptionId={selectedOptionId}
        />
      );
    default:
      return (
        <ProductVariationStandard
          key={v.id}
          variation={v}
          updateOptionHandler={updateOptionHandler}
          selectedOptionId={selectedOptionId}
        />
      );
  }
}

export default ProductVariations;
