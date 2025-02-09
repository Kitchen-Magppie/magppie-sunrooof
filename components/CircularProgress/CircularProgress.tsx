import { Icon } from "@iconify/react"

export default function CustomCircularProgress(props: TProps) {
    return (
        <Icon icon='line-md:loading-loop'
            className={`${props?.className?.length ? props.className : 'text-indigo-600'}`}
        />
    )
}

type TProps = {
    // size?: string,
    className?: string
}
