import { useState } from "react";

import { ProductComponentOption, ProductResponse, ResourcePage, File } from "@moltin/sdk";
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

interface IProductOptionsProps {
  product: ProductResponse;
  componentName: string;
  components: ProductResponse[];
  selectedOption: string[];
  images: ResourcePage<File>;
  handleOptionSelection: (optionId: string, quantity: number, componentName: string) => void
}

const ProductOptions = ({
  product,
  componentName,
  components,
  selectedOption,
  images,
  handleOptionSelection
}: IProductOptionsProps): JSX.Element => {
  const [selected, setSelected] = useState(selectedOption[0]);

  const handleChangeSelection = (optionId: string, quantity: number) => {
    setSelected(optionId)
    handleOptionSelection(optionId, quantity, componentName)
  }

  const fetchComponentDetails = (option: ProductComponentOption, checked: boolean) => {
    const result = components.find(component => component.id == option.id)
    const included_components: any = product.meta?.component_products && product.meta?.component_products[option.id];
    const mainImageUrl = images.data.find(image => image.id == result?.relationships.main_image.data?.id)
    return (
      <>
        {mainImageUrl && mainImageUrl.link.href && (
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src={mainImageUrl.link.href} alt="" className="h-full w-full object-cover object-center" />
          </div>
        )}
        <div className="text-[12px] ml-5">
          <RadioGroup.Label
            as="p"
            className={`font-medium mb-1  ${checked ? 'text-black' : 'text-gray-900'
              }`}
          >
            {option.quantity} x {result?.attributes.name}
          </RadioGroup.Label>
          <RadioGroup.Description
            as="span"
            className={`inline ${checked ? 'text-black' : 'text-gray-900'
              }`}
          >
            <div>
              <span className={`${included_components?.original_display_price?.without_tax.formatted ? 'text-red-600 mr-2' : 'text-black'}`}>{included_components?.display_price.without_tax.formatted}</span>
              {included_components?.original_display_price?.without_tax.formatted && (
                <span className="line-through text-gray-700 ">
                  {included_components?.original_display_price?.without_tax.formatted}
                </span>
              )}
            </div>
          </RadioGroup.Description>
        </div>
      </>
    )
  }

  const allOptions = product.attributes.components[componentName].options;

  return (
    <div className="w-full py-5">
      <div className="mx-auto">
        <RadioGroup value={selected}>
          <div className="space-y-2">
            {allOptions.map((option) => (
              <RadioGroup.Option
                key={option.id}
                value={option.id}
                onClick={() => handleChangeSelection(option.id, option.quantity)}
                className={({ active, checked }) =>
                  `${active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-600'
                    : ''
                  }
                  ${checked ? 'bg-gradient-to-r from-orange-300 from-10%  to-green-300 to-80% bg-opacity-75  text-white' : 'bg-gray-100'}
                  relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        {fetchComponentDetails(option, checked)}
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ProductOptions;
