import { ReactNode } from "react"


export function ActionButton(props: TProps) {

    const variation = (props.variant === 'secondary' || props?.disabled) ? 'border border-[#6b8a7a] text-[#6b8a7a]' : 'bg-[#6b8a7a] text-white'
    return (<button
        type="button"
        onClick={props.onClick}
        disabled={props?.disabled}
        className={`bg-gradient-to-r ${variation} hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#6b8a7a] dark:focus:ring-[#6b8a7a]  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center`}
    >
        {props.icon}
        {props.label}
    </button>)
}
type TProps = {
    onClick: VoidFunction,
    disabled?: boolean,
    variant?: 'primary' | 'secondary',
    icon?: ReactNode,
    label: string,
}

export default ActionButton
