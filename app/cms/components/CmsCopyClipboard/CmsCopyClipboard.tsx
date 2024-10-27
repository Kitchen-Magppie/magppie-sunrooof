import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import { useCmsCopyClipboard } from "./useCmsCopyClipboard";
export default function CmsCopyClipboard(props: TProps) {
    const { data, action } = useCmsCopyClipboard()

    return <button type="button" onClick={() => { action.onClickCopyClipboard(props.text) }}>
        {data.isCopied ? (<TbCopyCheckFilled className="text-green-500" />) : <TbCopy />}
    </button>
}

type TProps = { text?: string }
