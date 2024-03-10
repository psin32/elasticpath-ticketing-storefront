'use client'

export default function SearchBar(): JSX.Element {

    return (
        <div className="ml-4 flex lg:ml-6">
            <a href="#" className="p-2 text-gray-50 hover:text-primary-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </a>
        </div>
    )
}
