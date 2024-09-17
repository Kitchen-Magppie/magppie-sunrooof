import { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use"

export function useCmsCopyClipboard() {
    const [corpus, setCorpus] = useState(INIT_CORPUS);
    const [{ value }, copyToClipboard] = useCopyToClipboard()

    useEffect(() => {
        if (corpus.isCopied) {
            const timer = setTimeout(() => {
                setCorpus((prev) => ({ ...prev, isCopied: false }))
            }, MAX_DURATION)
            return () => clearTimeout(timer)

        }
    }, [corpus.isCopied])
    return ({
        data: corpus,
        action: {
            onClickCopyClipboard: (text: string) => {
                copyToClipboard(text)
                if (value?.length) {
                    setCorpus((prev) => ({ ...prev, isCopied: true }))
                }

            }
        }
    })
}
type TCorpus = { isCopied: boolean }
const INIT_CORPUS: TCorpus = { isCopied: false }
const MAX_DURATION = 1000
