import { useState, Fragment } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const MenuLink = ({ blok }: any) => {
  return (
    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
      <div className="flex h-full space-x-8">
        <Popover className="flex">
          {({ open }) => (
            <>
              <div className="relative flex">
                <Popover.Button
                  className={classNames(
                    open
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-primary-800 hover:text-primary-600',
                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-md font-thin transition-colors duration-200 ease-out rounded-none outline-0'
                  )}
                >
                  {blok.name}
                </Popover.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-primary-700">
                  <div className="absolute inset-0 top-1/2 bg-white shadow-none" aria-hidden="true" />
                  <div className="relative bg-primary-50">
                    <div className="mx-auto max-w-7xl px-8">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-16">
                        <div className="row-start-1 grid grid-cols-6 gap-x-8 gap-y-10 text-sm">
                          {
                            blok.menu.map((nestedBlok: any) => {
                              return (
                                <div key={nestedBlok._uid}>
                                  <p
                                    {...storyblokEditable(nestedBlok)} id={nestedBlok._uid} onClick={() => <Link href={nestedBlok.link.url} />}
                                    className="text-primary-900 font-bold">
                                    <Link href={nestedBlok.link.url} >{nestedBlok.name}</Link>
                                  </p>

                                  <ul role="list" aria-labelledby="Clothing-heading" className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                    {
                                      nestedBlok.menu.map((child: any) => {
                                        return (
                                          <li className="flex" key={child._uid}>
                                            <Link href={child.link.url} className="hover:text-primary-700 hover:font-semibold">{child.name}</Link>
                                          </li>
                                        )
                                      })
                                    }
                                  </ul>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </Popover.Group>
  )
}

export default MenuLink
