import AccountAddress from "@/components/accounts/AccountAddress";
import Header from "@/components/header/Header";
import { getAccountAddresses } from "@/services/accounts";
import { cookies } from 'next/headers'
import {
  CreditCardIcon,
  CubeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

const secondaryNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Orders', href: '/', icon: CubeIcon, current: false },
  { name: 'Addresses', href: '#', icon: CubeIcon, current: true },
  { name: 'Card', href: '#', icon: CreditCardIcon, current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default async function Address() {
  const cookieStore = cookies()
  const accountId = cookieStore.get("ep__account_id")?.value || "";
  const accountAccessToken = cookieStore.get("ep__account_access_token")?.value || "";
  const response = await getAccountAddresses(accountId, accountAccessToken)

  return (
    <main className="flex flex-col justify-between">
      <Header />
      <div className="mx-auto container">
        <div className="w-full pt-2 lg:flex lg:gap-x-16 lg:px-8">
          <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-10">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
              <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-50 text-primary-600'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          {response && <AccountAddress addresses={response}></AccountAddress>}
        </div>
      </div>

    </main>
  )
}
