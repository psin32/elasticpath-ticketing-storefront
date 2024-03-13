'use client'

import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function  CurrencySelector(): JSX.Element {
    const [currency, setCurrency] = useState(getCookie("currency") || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY_CODE)
    const [currencies, setCurrencies] = useState<any>()
    const router = useRouter()

    const changeCurrency = (currency: string) => {
        setCookie("currency", currency)
        setCurrency(currency)
        router.refresh()
    }

    useEffect(() => {
        const init = async () => {
            setCookie("currency", currency)
            await fetchAllCurrencies()
        };
        init();
    }, [currency]);

    const fetchAllCurrencies = async () => {
        const response = await fetch(`/api/currencies`, {
            method: "POST"
        })
        const currencies = await response.json()
        setCurrencies(currencies)
    }

    return (
        currencies && (
            <select
                id="locale"
                name="locale"
                defaultValue={currency}
                className="bg-gray-800 border-none mt-1 block rounded-md py-1.5 pl-3 pr-10 uppercase text-[12px]"
                onChange={(e) => {
                    changeCurrency(e.target.value)
                }}
            >
                {currencies.data.map((currency: any) => {
                    return <option key={currency.id} value={currency.code}>{currency.code}</option>
                })}
            </select>
        )
    )
}
