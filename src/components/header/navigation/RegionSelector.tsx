'use client'

import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegionSelector(): JSX.Element {
    const [catalog, setCatalog] = useState(getCookie("catalog") || "")
    const [catalogRule, setCatalogRule] = useState<any>()
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
                    return <option key={rule.id} value={rule?.attributes?.tags?.[0] ? rule?.attributes?.tags[0] : ""}>
                        {rule?.attributes?.tags?.[0] ? rule?.attributes?.tags[0] : rule?.attributes?.name}
                    </option>
                })}
            </select>
        )
    )
}
