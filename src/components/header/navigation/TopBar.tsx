'use client'

import { useTranslation } from "@/app/i18n/client"
import { getCookie } from "cookies-next"
import { Trans } from 'react-i18next/TransWithoutContext'
import LanguageSelector from "./LanguageSelector"
import RegionSelector from "./RegionSelector"
import CurrencySelector from "./CurrencySelector"

export default function TopBar(): JSX.Element {
    const { t } = useTranslation(getCookie("locale") || "", "header", {})

    return (
        <div className="bg-gray-800 px-4 text-sm font-medium sm:px-6 lg:px-8">
            <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
                <div className="ml-4 flex items-center lg:ml-0 font-thin uppercase text-[12px]">
                    <div className="text-gray-300">
                        <Trans t={t} i18nKey="header.label.personal" />
                    </div>
                    <div className="ml-4 text-gray-400">
                        <Trans t={t} i18nKey="header.label.business" />
                    </div>
                    <div className="ml-4 text-gray-400">
                        <Trans t={t} i18nKey="header.label.bell-for-better" />
                    </div>
                    <div className="ml-auto text-gray-300">
                        <div className="flex flex-row-reverse">
                            <LanguageSelector />
                            <RegionSelector />
                            <CurrencySelector />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
