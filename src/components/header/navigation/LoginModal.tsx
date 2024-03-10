'use client'

import { useState, Fragment } from "react";
import { Dialog, Transition, Menu, Tab } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/20/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import SignInForm from "@/components/forms/SignIn";
import RegistrationForm from "@/components/forms/Registration";
import ToastMessage from "@/components/common/ToastMessage";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { getCookie } from "cookies-next";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function LoginModal(): JSX.Element {
    const [open, setOpen] = useState(false)
    const [clicked, setClicked] = useState<boolean>(false);
    const { data: session, status } = useSession()
    const [error, setError] = useState("");
    const { t } = useTranslation(getCookie("locale") || "", "profile", {})

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        setClicked(true)
        setError("");
        event.preventDefault();
        const form = new FormData(event.target as HTMLFormElement);
        const result = await signIn("credentials", {
            email: form.get('email'),
            password: form.get('password'),
            type: "login",
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        } else {
            toast.success("Successfully Login")
            setOpen(false)
        }
        setClicked(false)
    }

    const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
        setClicked(true)
        setError("")
        event.preventDefault();
        const form = new FormData(event.target as HTMLFormElement);
        const result = await signIn("credentials", {
            email: form.get('email'),
            name: form.get('full_name'),
            password: form.get('password'),
            type: "registration",
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        } else {
            toast.success("You have successfully registered!")
            setOpen(false)
        }
        setClicked(false)
    }

    return (
        <>
            <div className="ml-4 flow-root lg:ml-8">
                {!session?.user && (
                    <button onClick={() => setOpen(true)} type="button" className="group -m-2 flex items-center p-2 relative text-gray-50 hover:text-primary-300 text-sm">
                        {t('header.signin')}
                    </button>
                )}
                {session?.user && status == "authenticated" && (
                    <Menu as="div" className="relative ">
                        <div>
                            <Menu.Button className="relative text-gray-50 hover:text-primary-300 group -m-2 flex items-center p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="oc se h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                                </svg>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="divide-y mb-3 font-semibold">
                                    <div className="block px-4 py-2 text-[15px] text-gray-800 mb-2 mt-2">
                                        {t('label.welcome')}, {session.user.name?.indexOf(" ") && session.user.name?.indexOf(" ") > 0 ? session.user.name?.split(" ")[0] : session.user.name}
                                    </div>
                                    <div></div>
                                </div>

                                <Menu.Item>
                                    {({ active }) => (
                                        <Link href={"/account/profile"} className={classNames(active ? 'bg-primary-100' : '', 'block px-8 py-2 text-sm text-gray-700')}>
                                            {t('label.profile')}
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link href={"/account/orders"} className={classNames(active ? 'bg-primary-100' : '', 'block px-8 py-2 text-sm text-gray-700')}>
                                            {t('label.orders')}
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link href={"/account/address"} className={classNames(active ? 'bg-primary-100' : '', 'block px-8 py-2 text-sm text-gray-700')}>
                                            {t('label.addresses')}
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a href="#" onClick={(e) => { e.preventDefault(); signOut() }} className={classNames(active ? 'bg-primary-100' : '', 'block px-8 py-2 text-sm text-gray-700')}>
                                            {t('label.logout')}
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                )}

            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-2xl">
                                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">

                                        <button
                                            type="button"
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                            onClick={() => setOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <div className="w-full px-2 py-16 sm:px-0">
                                            <Tab.Group>
                                                <Tab.List className="flex space-x-1 rounded-xl bg-primary-900/20 p-1">
                                                    <Tab
                                                        key="login"
                                                        className={({ selected }) =>
                                                            classNames(
                                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                            )
                                                        }
                                                    >
                                                        {t('label.login')}
                                                    </Tab>
                                                    <Tab
                                                        key="register"
                                                        className={({ selected }) =>
                                                            classNames(
                                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                            )
                                                        }
                                                    >
                                                        {t('label.register')}
                                                    </Tab>
                                                </Tab.List>
                                                <Tab.Panels className="mt-2">
                                                    <Tab.Panel key="login-panel" className={classNames('rounded-xl bg-white p-3',)}>
                                                        <SignInForm error={error} clicked={clicked} handleSignIn={handleSignIn}></SignInForm>
                                                    </Tab.Panel>
                                                    <Tab.Panel key="login-panel" className={classNames('rounded-xl bg-white p-3',)}>
                                                        <RegistrationForm error={error} clicked={clicked} handleRegistration={handleRegistration}></RegistrationForm>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastMessage position="top-center"></ToastMessage>
        </>
    )
}
