import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { MdDeleteOutline, MdPostAdd } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
//====================================================================

import {
    CmsComponentMediaEnum,
    COMPONENT_MEDIA_ITEM,
    TComponentMediaItem,
    ViewPortEnum
} from "../../../../../types"
// import { FormToggle } from "../../../components"
// import { useCallback } from "react"
// import _ from "../../../../../types/lodash"
import { ImageInput } from "../../../../../components"
import { _ } from "../../../../../types"

export default function FormViewPortMedia({ viewport, name }: TProps) {
    const methods = useFormContext<TViewPortMedia>()
    const { formState: { errors }, watch, setValue, register } = methods
    const values = watch()
    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return <p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>
        }
        return ''
    }, [errors])
    const currentValues = _.get(values, name, [])?.filter((row) => row.viewport === viewport)
    return <div className="flex flex-col gap-2">
        <div
            className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-row align-middle justify-center items-center gap-2 ">
                    <CiCircleAlert className="inline text-xl text-indigo-800" />
                    <h3 className="text-lg font-medium text-indigo-800 dark:text-gray-300">
                        Array Field
                    </h3>
                </div>
                <div className="">
                    <MdPostAdd
                        onClick={() => {
                            const orderId = _.applyOrder(_.map(currentValues, 'orderId')).prefer
                            const currentMutation: TComponentMediaItem[] = [
                                ...currentValues,
                                {
                                    ...COMPONENT_MEDIA_ITEM,
                                    viewport: viewport as ViewPortEnum,
                                    orderId
                                },
                            ]
                            setValue(name, currentMutation)
                        }}
                        className='text-xl text-indigo-500 cursor-pointer'

                    />
                </div>
            </div>
            <div className="mt-2 mb-4 text-sm text-indigo-800 dark:text-indigo-300">
                This section contains multiple fields that require your attention. Ensure all the information provided is accurate, as once you submit the form, changes cannot be undone. Double-check your entries before proceeding.</div>
            <div className="flex">
                <button
                    type="button"
                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center items-center dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-indigo-800 flex gap-1"
                >
                    <FaExternalLinkAlt />
                    Learn more
                </button>

            </div>
        </div>

        {/* <div className=""> */}
        {/* <div className="font-bold">Links</div> */}
        {/* <ImageInput
                label='Links'
                values={values.links.icon?.length ? [values.links.icon] : []}
                path={`customer-site-components/icons`}
                onSuccess={(e) => {
                    setValue('links.icon', e[0])
                }}
            /> */}
        {/* </div> */}
        <div className="">
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex gap-2">
                    <div className="font-bold"> {_.capitalize(name)}</div>
                </div>
            </div>

            {currentValues?.map((item, i) => {
                const renderTypography = (<div key={i}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Order ID
                        </label>
                        <input
                            type="text"
                            {...register(`${name}.${i}.orderId`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`${name}.${i}.typography.secondaryDescription`)}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Main
                        </label>
                        <input
                            type="text"
                            {...register(`${name}.${i}.typography.main`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`${name}.${i}.typography.main`)}
                    </div>



                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            {...register(`${name}.${i}.typography.description`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`${name}.${i}.typography.description`)}
                    </div>


                </div>
                )
                return (<div key={i}>
                    <div className='w-full'>
                        <div className="">
                            <div className="flex flex-row justify-between items-center">
                                <div className='text-xl text-gray-500 italic'>#{i + 1}.</div>
                                <div className="">
                                    <MdDeleteOutline className='text-xl text-red-700 cursor-pointer me-4'
                                        onClick={() => {

                                            const results = currentValues?.filter((prevItem) => prevItem !== item)
                                            setValue(name, results)
                                        }}

                                    />
                                </div>
                            </div>

                        </div>
                        {renderTypography}
                        <ImageInput
                            values={item.link?.length ? [item.link] : []}
                            path={`customer-site-components/${name}`}

                            onSuccess={(e) => {
                                // console.log(e)
                                setValue(`${name}.${i}.link`, e[0])
                            }}
                        />
                    </div>
                </div>)
            })}


        </div>
    </div>
}

type TProps = {
    viewport: ViewPortEnum,
    name: CmsComponentMediaEnum
}

type TViewPortMedia = {
    // links: TComponentLink,
    icons: TComponentMediaItem[],
    gallery: TComponentMediaItem[],
    isGallery: boolean
}
