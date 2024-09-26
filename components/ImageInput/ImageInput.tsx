import { ChangeEvent, useCallback, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { useFirebaseStorageActions } from "../../hooks/firebase"

import { CircularProgress } from ".."
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function ImageInput(props: TImageActionProps) {

    const [corpus, setCorpus] = useState<TCorpus>({
        ...INIT_CORPUS,
        values: props.values || []
    })

    const StorageActions = useFirebaseStorageActions()

    const onRemove = useCallback((e: string) => {
        // StorageActions.remove(e)
        setCorpus((prev) => ({ ...prev, values: prev.values?.filter((row) => row !== e) }))
        // props.onSuccess(corpus.values?.filter((row) => row !== e))
    }, [])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files)
        if (files?.length) {
            setCorpus((prev) => ({ ...prev, loading: true }))

            StorageActions.batch.upload({
                files,
                path: props.path,
                onSuccess: (values) => {
                    setCorpus((prev) => ({
                        ...prev,
                        loading: false,
                        values: props.isMulti ? [...prev.values, ...values]?.filter((row) => row?.length) : values
                    }))
                    props.onSuccess(props.isMulti ? [
                        ...corpus.values,
                        ...values]?.filter((row) => row?.length) : values)

                },
            })
        }

    }
    return (<div>
        {props.label?.length ? (<label className="block text-sm font-medium text-gray-700">
            {props.label}
        </label>) : ''}
        <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            multiple={props.isMulti}
            onChange={onChangeInput}
            value={[]}
            type="file"
            accept="image/*"
        />
        <div className="flex flex-wrap">
            {corpus.loading ? <CircularProgress /> : corpus?.values?.map((link, i) => {
                return <div key={i} className="relative my-2 ">
                    <ImageCard link={link} onRemove={onRemove} />
                </div>
            })}
        </div>

    </div>)
}

function ImageCard(props: TImageCardProps) {
    return (<div className="relative my-2 ">
        <LazyLoadImage
            effect="blur"
            src={props.link}
            alt=""
            className="w-32 h-32 object-cover rounded-lg ms-1"
        />
        <button
            onClick={() => { props.onRemove(props.link) }}
            className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
            <IoMdClose />
        </button>
    </div>)
}

type TImageCardProps = {
    link: string,
    onRemove: (link: string) => void
}


type TImageActionProps = {
    onSuccess: (e: string[]) => void,
    path: string,
    isMulti?: boolean,
    values?: string[],
    label?: string
}
type TCorpus = { loading: boolean, values: string[] }
const INIT_CORPUS: TCorpus = { loading: false, values: [] }
