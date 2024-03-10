
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

const ProductVariationStandard = ({
  variation,
  selectedOptionId,
  updateOptionHandler,
}: IProductVariation): JSX.Element => {
  const buttonHighlightStyle = {
    bgColor: "brand.primary",
    color: "white",
  };

  const buttonStandardStyle = {
    bgColor: "white",
    color: "gray.800",
  };

  return (
    <div className="mt-10">
      <div>
        <h3 className="text-sm font-medium text-gray-900 uppercase">{variation.name}</h3>
        <fieldset className="mt-4" id="size">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {variation.options.map((o) => (
              <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm" key={o.id}>
                <input type="radio" name="size-choice" value={o.name} className="sr-only" aria-labelledby="size-choice-1-label" onClick={() => updateOptionHandler(variation.id)(o.id)} />
                <span id="size-choice-1-label">{o.name}</span>
                <span className={`pointer-events-none absolute -inset-px rounded-md ${o.id == selectedOptionId ? "ring ring-primary-700" : ""}`} aria-hidden="true"></span>
              </label>
            ))}
            {/* <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
                <input type="radio" name="size-choice" value="XXS" disabled className="sr-only" aria-labelledby="size-choice-0-label" />
                <span id="size-choice-0-label">XXS</span>
                <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                  <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                    <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              </label> */}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default ProductVariationStandard;
