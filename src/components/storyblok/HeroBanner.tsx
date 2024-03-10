'use client'

import { storyblokEditable } from "@storyblok/react";

const HeroBanner = ({ blok }: any) => {
  return (
    <div {...storyblokEditable(blok)} className="hidden duration-1000 ease-in-out" data-carousel-item>
      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8 md:grid-cols-2">
          <img className="" src={blok?.image_url?.filename} alt="..." />
          <div className="text-2xl my-auto md:text-3xl lg:text-4xl text-left">
            <div className="font-semibold">{blok.title}</div>
            <span className="text-lg">{blok.description}</span>

            {blok.button_text && blok.link.url && (
              <div className="mt-4">
                <a href={blok.link.url} role="button" data-te-ripple-init data-te-ripple-color="primary"
                  className="rounded-full border-transparent px-8 py-4 text-sm font-medium uppercase leading-normal text-white  drop-shadow-2x bg-primary-900 hover:bg-primary-500">
                  {blok.button_text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default HeroBanner;
