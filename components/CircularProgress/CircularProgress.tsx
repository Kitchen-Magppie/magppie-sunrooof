import { Icon } from "@iconify/react"

export default function CustomCircularProgress(props: TProps) {
    return (
        <Icon icon='line-md:loading-loop' className={`text-indigo-600 text-${props.size || '5xl'}`} />
    )
}

type TProps = { size?: string }
