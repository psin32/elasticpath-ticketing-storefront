'use client'

import { useTranslation } from "@/app/i18n/client"
import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Trans } from 'react-i18next/TransWithoutContext'

export default function RegionSelector(): JSX.Element {
    const [catalog, setCatalog] = useState(getCookie("catalog") || "ontario")
    const [catalogRule, setCatalogRule] = useState<any>()
    const { t } = useTranslation(getCookie("locale") || "en", "header", {})
    const router = useRouter()

    const changeCatalog = (catalog: string) => {
        setCookie("catalog", catalog)
        setCatalog(catalog)
        router.refresh()
    }

    useEffect(() => {
        const init = async () => {
            setCookie("catalog", catalog)
            await fetchCatalogRules()
        };
        init();
    }, [catalog]);

    const fetchCatalogRules = async () => {
        const response = await fetch(`/api/catalogs/rules`, {
            method: "POST"
        })
        const rules = await response.json()
        setCatalogRule(rules)
    }

    return (
        catalogRule && (
            <select
                id="locale"
                name="locale"
                defaultValue={catalog}
                className="bg-gray-800 border-none mt-1 block rounded-md py-1.5 pl-3 pr-10 uppercase text-[12px]"
                onChange={(e) => {
                    changeCatalog(e.target.value)
                }}
            >
                {catalogRule.data.map((rule: any) => {
                    return <option key={rule.id} value={rule?.attributes?.tags[0]}><Trans t={t} i18nKey={`regions.${rule?.attributes?.tags[0]}`} /></option>
                })}
            </select>
        )
    )
}