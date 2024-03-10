import { colorLookup } from "../../../lib/color-lookup";

interface ProductVariationOption {
  id: string;
  description: string;
  name: string;
}

export type UpdateOptionHandler = (
  variationId: string
) => (optionId: string) => void;

interface IProductVariation {
  variation: {
    id: string;
    name: string;
    options: ProductVariationOption[];
  };
  updateOptionHandler: UpdateOptionHandler;
  selectedOptionId?: string;
}

const ProductVariationColor = ({
  variation,
  selectedOptionId,
  updateOptionHandler,
}: IProductVariation): JSX.Element => {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900 uppercase">{variation.name}</h3>

      <fieldset className="mt-4">
        <div className="flex items-center space-x-3">
          {variation.options.map((o) => (
            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400" key={o.id}>
              <span aria-hidden="true" className={`h-8 w-8 bg-${colorLookup[o.name.toLowerCase()]} rounded-full border border-black border-opacity-10 ${o.id == selectedOptionId ? "ring ring-offset-1 ring-primary-700" : ""}`} onClick={() => updateOptionHandler(variation.id)(o.id)}></span>
            </label>
          ))}

        </div>
      </fieldset>
    </div>
  );
};

export default ProductVariationColor;
