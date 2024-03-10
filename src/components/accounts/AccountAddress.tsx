'use client'

import { Menu, Transition } from '@headlessui/react'
import {
    EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import { Fragment } from 'react'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface IAccountAddress {
    addresses: any;
}

export default function AccountAddress({ addresses }: IAccountAddress): JSX.Element {
    return (
        <div className="bg-white py-4 w-full lg:py-10">
            <div className="mx-auto px-6 lg:px-0">
                <div className="">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                        <a href="#" className="text-sm font-semibold leading-6 text-primary-600 hover:text-indigo-500">
                            Add address
                        </a>
                    </div>
                    <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                        {addresses.data.map((address: any) => (
                            <li key={address.id} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                <div className="flex items-center gap-x-4 border-gray-900/5 p-6">
                                    <div className="grid grid-flow-row text-sm font-medium leading-6 text-gray-900">
                                        {address.name}
                                        <span>{address.company_name}</span>
                                        <span>{address.line_1}</span>
                                        <span>{address.line_2}</span>
                                        <span>{address.city}</span>
                                        <span>{address.region}</span>
                                        <span>{address.state}</span>
                                        <span>{address.postcode}</span>
                                        <span>{address.country}</span>
                                        <span>{address.phone_number}</span>
                                    </div>
                                    <Menu as="div" className="relative ml-auto">
                                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Edit
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Delete
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
