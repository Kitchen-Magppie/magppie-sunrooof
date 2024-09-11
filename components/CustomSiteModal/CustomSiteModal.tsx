import { ReactNode, useEffect, useMemo } from 'react'
import { IoMdClose } from 'react-icons/io'

export default function CustomSiteModal(props: IProps) {
    const isSmall = useMemo(
        () => props.size === 'small' || !props?.size?.length,
        [props.size]
    )

    useEffect(() => {
        document.body.style.overflow = props.open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [props.open])

    return (
        <div>
            {props.open && (
                <div
                    className={`fixed inset-0 z-40 transition-all duration-300 backdrop-blur-sm ${
                        props.open ? 'bg-opacity-50' : 'bg-opacity-0'
                    }`}
                />
            )}
            <div
                aria-hidden={!props.open}
                className={`fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden transform transition-transform duration-500 flex font-custom ${
                    props.open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div
                    className={`fixed inset-0 -z-40 `}
                    onClick={() => {
                        props.onHide()
                    }}
                />
                <div
                    className={`relative w-full ${
                        isSmall ? 'max-w-3xl' : ' max-w-xl'
                    } max-h-full`}
                >
                    <div className="relative bg-[#1E1E1E] rounded-lg shadow">
                        <div
                            className={`flex items-center justify-between rounded-t ${
                                isSmall ? 'px-8 py-10' : 'px-6 py-5'
                            }`}
                        >
                            <h3
                                className={`font-thin text-white ${
                                    isSmall ? 'text-7xl' : 'text-4xl'
                                }`}
                            >
                                {props.header}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                    props.onHide()
                                }}
                            >
                                <IoMdClose
                                    style={{
                                        fontSize: isSmall ? '4rem' : '2rem',
                                    }}
                                    // className={isSmall ? 'text-4xl' : "h-12 w-12"}
                                />
                            </button>
                        </div>

                        <div className={isSmall ? 'px-10 py-5' : 'px-5 py-2'}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface IProps {
    onHide: VoidFunction
    open: boolean
    children: ReactNode
    header?: string
    size?: 'small' | 'large'
}
