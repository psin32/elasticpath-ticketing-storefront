import ProductSummary from "./ProductSummary";
import ProductDetails from "./ProductDetails";
// import ProductExtensions from "./ProductExtensions";
import { ReactElement } from "react";
import { IBase } from "@/types/product-types";
import { CartItem, CartLineItem, useCart } from "@/lib/hooks/cart";
import { Node } from "@moltin/sdk";
import { Toaster, toast, resolveValue, ToastIcon } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { config } from "@/constant/config";

interface IProductContainer {
  productBase: IBase;
  breadcrumb: Node[] | undefined;
  children?: ReactElement;
  bundlePrice?: string;
  bundleItems?: CartItem
}

export default function ProductContainer({
  productBase: { product, main_image },
  children,
  breadcrumb,
  bundlePrice,
  bundleItems,
}: IProductContainer): JSX.Element {
  const { addProductToCart, state } = useCart();

  const handleAddToCart = () => {
    if (bundleItems) {
      bundleItems && addProductToCart(bundleItems)
    } else {
      addProductToCart({
        productId: product.id,
        quantity: 1
      })
    }
    toast.success("Item added to your cart")
  }

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {breadcrumb && breadcrumb.map((node: Node) => {
                return (
                  <li key={node.id}>
                    <div className="flex items-center">
                      <a href="#" className="mr-2 text-sm font-medium text-gray-900">{node.attributes.name}</a>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                )
              })}

              <li className="text-sm">
                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.attributes.name}</a>
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-5">

            <div >
              <div className="sticky top-0 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 ">
                  {/* <a className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                    </svg>
                  </a> */}
                  {main_image && <img className="object-cover w-full lg:h-1/2 rounded-lg" src={main_image?.link.href} alt="" />}
                  {/* <a className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a> */}
                </div>
                {/* <div className="flex-wrap hidden -mx-2 md:flex">
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a className="block border border-transparent hover:border-blue-400" href="#">
                      <img className="object-cover w-full lg:h-32" src="https://i.postimg.cc/prW7DGkK/R-14.png" alt="" />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a className="block border border-transparent hover:border-blue-400" href="#">
                      <img className="object-cover w-full lg:h-32" src="https://i.postimg.cc/prW7DGkK/R-14.png" alt="" />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a className="block border border-transparent hover:border-blue-400" href="#">
                      <img className="object-cover w-full lg:h-32" src="https://i.postimg.cc/prW7DGkK/R-14.png" alt="" />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a className="block border border-transparent hover:border-blue-400" href="#">
                      <img className="object-cover w-full lg:h-32" src="https://i.postimg.cc/prW7DGkK/R-14.png" alt="" />
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="mt-4 lg:row-span-2 lg:mt-0">
              <ProductSummary product={product} bundlePrice={bundlePrice} />
              {children}
              <button
                onClick={handleAddToCart}
                type="submit"
                className="mt-10 mb-10 flex w-full items-center justify-center border border-transparent bg-primary-500 rounded bg-primary px-8 py-4 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add to Cart
              </button>
              <ProductDetails product={product} />
              {/* {extensions && <ProductExtensions extensions={extensions} />} */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
