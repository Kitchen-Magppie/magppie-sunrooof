import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
//====================================================================
import { useDisableScroll } from '../../hooks'

export default function CustomSimpleModal(props: TProps) {

    useDisableScroll(props.show)

    if (props.show) {
        return (<div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-y-scroll">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => { props.onHide() }}
            />
            <div className="relative p-4 w-full max-w-4xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {props.label}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                                props.onHide()
                            }}
                        >
                            <MdClose className="h-5 w-5" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
        )
    }
    return <></>
}

type TProps = {
    show: boolean
    onHide: VoidFunction
    children: ReactNode
    label: string
}
