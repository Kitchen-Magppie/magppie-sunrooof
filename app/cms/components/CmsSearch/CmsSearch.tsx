import { IoMdSearch } from 'react-icons/io'

type TProps = {

    onChange: (e: string) => void,
    placeholder?: string
    centered?: boolean
}

export function CmsSearch(props: TProps) {
    return (<div className={props.centered ? "max-w-md mx-auto" : ''}>
        <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
            Search
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoMdSearch className="w-6 h-6 text-gray-500" />
            </div>
            <input
                type="search"
                onChange={(e) => { props.onChange(e.target.value) }}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder={props?.placeholder}
                required
            />
            <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
                Search
            </button>
        </div>
    </div>
    )
}

