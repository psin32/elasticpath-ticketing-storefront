'use client'

import { Toaster, resolveValue, ToastIcon, ToastPosition } from "react-hot-toast";
import { Transition } from '@headlessui/react'

interface IToastMessage {
    position: ToastPosition | undefined;
}

export default function ToastMessage({ position }: IToastMessage): JSX.Element {

    return (
        <Toaster gutter={24} position={position}>
            {(t) => (
                <Transition
                    appear
                    show={t.visible}
                    className="transform p-4 flex rounded shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    enter="transition-all duration-150"
                    enterFrom="opacity-0 scale-50"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-75"
                >
                    <div className="mr-4">
                        <ToastIcon toast={t} />
                    </div>
                    {resolveValue(t.message, t)}
                </Transition>
            )}
        </Toaster>
    )
}
