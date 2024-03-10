import { File, ProductResponse, ResourcePage } from "@moltin/sdk";
import ProductOptions from "./ProductOptions";
import { useEffect, useState } from "react";
import { configureBundle, getImagesByIds } from "@/services/products";
import { CartItem, CartLineItem } from "@/lib/hooks/cart";
import { config } from "@/constant/config";

interface IProductComponentsProps {
  components: ProductResponse[];
  product: ProductResponse;
  setBundlePrice: (bundlePrice: string) => void
  setBundleItems: (cartItems: CartItem) => void
}

const ProductComponents = ({
  components,
  product,
  setBundlePrice,
  setBundleItems
}: IProductComponentsProps): JSX.Element => {
  const [images, setImages] = useState<ResourcePage<File>>();
  const [selectedOptions, setSelectedOptions] = useState(product.meta.bundle_configuration?.selected_options);

  useEffect(() => {
    const init = async () => {
      const imageIds = getImageIds();
      setImages(await getImagesByIds(imageIds))
      const lines: CartLineItem[] = []
      selectedOptions && Object.keys(selectedOptions).map(option => {
        const selection = product.meta.bundle_configuration?.selected_options[option]
        const keys = selection && Object.keys(selection)
        keys && keys.map(key => {
          lines.push(buildLineItem(key, option))
        })
      })
      // setBundleItems({
      //   parentProductId: product.id,
      //   lines
      // })
    };
    init();
  }, []);

  const getImageIds = () => {
    const imageIds: string[] = []
    components.map(component => {
      if (component.relationships.main_image.data?.id && !(imageIds.includes(component.relationships.main_image.data?.id))) {
        imageIds.push(component.relationships.main_image.data?.id)
      }
    })
    return imageIds
  }

  const getSelectedOption = (name: string) => {
    if (product.meta.bundle_configuration?.selected_options[name]) {
      return Object.keys(product.meta.bundle_configuration?.selected_options[name])
    }
    return []
  }

  const getSelectionMessage = (name: string) => {
    const min = product.attributes.components[name]?.min
    const max = product.attributes.components[name]?.max

    let message = "(Optional: Choose any product below)"

    if (min) {
      if (min == 0 && max && max >= 1) {
        message = `(Optional: Choose upto ${max} product${max > 1 ? "s" : ""})`
      } else if (min == 1 && max && max == 1) {
        message = `(Required: Choose any 1 product)`
      } else if (min == 1 && max && max > 1) {
        message = `(Required: Choose minimum ${min} product and upto ${max} products)`
      } else if (min > 1 && max && max == min) {
        message = `(Required: Choose any ${min} products)`
      } else if (min > 1 && max && max > min) {
        message = `(Required: Choose minimum ${min} product and upto ${max} products)`
      }
    }

    return (
      <span className="text-[11px]">{message}</span>
    )
  }

  const buildLineItem = (optionId: string, componentName: string) => {
    return {
      merchandiseId: components.find(component => component.id === optionId)?.attributes.extensions?.[config.shopifyTemplateSlug]?.[product.meta.catalog_id || ""].toString() || "",
      quantity: product.attributes.components[componentName].options.find(option => option.id == optionId)?.quantity || 1,
      optionId
    }
  }

  const handleOptionSelection = async (optionId: string, quantity: number, componentName: string) => {
    if (selectedOptions) {
      selectedOptions[componentName] = {
        [optionId]: quantity
      }
    }
    const response = await configureBundle(product.id, selectedOptions)

    const lines: CartLineItem[] = []
    lines.push(buildLineItem(optionId, componentName))

    selectedOptions && Object.keys(selectedOptions).map(option => {
      if (option != componentName) {
        const selection = selectedOptions[option]
        const keys = selection && Object.keys(selection)
        keys && keys.map(key => {
          lines.push(buildLineItem(key, option))
        })
      }
    })
    setBundlePrice(response.data.meta.display_price?.without_tax.formatted || "")
    // setBundleItems({
    //   parentProductId: product.id,
    //   lines
    // })
  }

  return (
    <div className="mt-5">
      {Object.keys(product.attributes.components).map((cmpName) => {
        const bundle_configuration = product.meta.bundle_configuration;
        return (
          <div key={cmpName}>
            <div>{product.attributes.components[cmpName].name} {getSelectionMessage(cmpName)}</div>
            {bundle_configuration ? (
              images && <ProductOptions product={product} componentName={cmpName} components={components} selectedOption={getSelectedOption(cmpName)} images={images} handleOptionSelection={handleOptionSelection} />
            ) : null}
          </div>
        );
      })}
    </div >
  );
};

export default ProductComponents;
