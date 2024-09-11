import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TKitchenTier } from "../../app/cms/types/Kitchen";


export default function SimpleDropdown(props: TProps) {

    const [corpus, setCorpus] = useState<TCorpus>({
        open: false,
        options: props.options,
        selection: props.selection || INIT_SELECTION
    })

    return (<div className="relative  text-left">
        <div>
            <button
                type="button"
                className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white p-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => { setCorpus((prev) => ({ ...prev, open: !prev.open })) }}
            >
                {corpus.selection.label || 'Select Tier'}
                {corpus.open ? <IoIosArrowUp className="my-auto" /> : <IoIosArrowDown className='my-auto' />}
            </button>
        </div>

        {corpus.open && (
            <div
                onMouseLeave={() => {
                    setCorpus((prev) => ({ ...prev, open: false }))
                }}
                className="x-menu absolute right-auto z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >
                <div className="py-1" role="none">
                    {corpus?.options.map((option, i) => (
                        <div
                            key={i}
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-500"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-0"
                            onClick={() => {
                                setCorpus((prev) => ({
                                    ...prev,
                                    selection: option,
                                    open: !prev.open
                                }))
                                props.onChange(option)
                            }}
                        >
                            {option.label}
                        </div>

                    ))}

                </div>
            </div>
        )

        }
    </div>
    )
}
type TProps = {
    options: TKitchenTier[],
    onChange: (e) => void,
    selection?: TKitchenTier
}

type TCorpus = {
    open: boolean,
    options: TKitchenTier[],
    selection?: TKitchenTier
}
const INIT_SELECTION: TKitchenTier = { label: '', value: '' }
