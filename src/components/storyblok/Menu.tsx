import { StoryblokComponent } from "@storyblok/react";
import { useState } from "react";
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'


const Config = ({ blok }: any) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className="relative rounded-md p-2 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="absolute -inset-0.5" />
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
        <div className="flex h-full space-x-8">

          {blok.menu.map((nestedBlok: any) => (
            <StoryblokComponent className='' blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </Popover.Group>
    </>
  )
};

export default Config;
