import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { MdDeleteOutline } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
//====================================================================

import {
    COMPONENT_MEDIA_ITEM,
    TComponentMediaItem
} from "../../../../../types"
// import { FormToggle } from "../../../components"
// import { useCallback } from "react"
// import _ from "../../../../../types/lodash"
import { ImageInput } from "../../../../../components"
import _ from "../../../../../types/lodash"

export default function FormViewPortMedia(props: TProps) {
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
    console.log(props)

    return <div className="flex flex-col gap-2">

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
                    <div className="font-bold">Gallery</div>
                    {/* <FormToggle checked={values.isGallery} onToggle={(isGallery) => {
                        console.log(isGallery)
                        setValue('isGallery', isGallery)
                    }} /> */}
                </div>
                <MdPostAdd
                    onClick={() => {
                        const currentGallery: TComponentMediaItem[] = [
                            ...values.gallery,
                            COMPONENT_MEDIA_ITEM
                        ]
                        setValue('gallery', currentGallery)
                    }}
                    className='text-xl text-blue-500 cursor-pointer'

                />
            </div>

            {values.gallery?.map((item, i) => {
                const renderTypography = (<div key={i}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Main
                        </label>
                        <input
                            type="text"
                            {...register(`gallery.${i}.typography.main`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`gallery.${i}.typography.main`)}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Secondary
                        </label>
                        <input
                            type="text"
                            {...register(`gallery.${i}.typography.secondary`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`gallery.${i}.typography.secondary`)}

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Subtitle
                        </label>
                        <input
                            type="text"
                            {...register(`gallery.${i}.typography.subtitle`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`gallery.${i}.typography.subtitle`)}

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Action
                        </label>
                        <input
                            type="text"
                            {...register(`gallery.${i}.typography.action`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`gallery.${i}.typography.action`)}

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            {...register(`gallery.${i}.typography.description`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`gallery.${i}.typography.description`)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Secondary Description
                        </label>
                        <input
                            type="text"
                            {...register(`gallery.${i}.typography.secondaryDescription`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`gallery.${i}.typography.secondaryDescription`)}
                    </div>
                </div>
                )
                return (<div key={i}>
                    <div className='w-full'>
                        <div className="">
                            <div className="flex flex-row justify-between items-center">
                                <div className='text-xl text-gray-500 italic'>#{i + 1}.</div>
                                <div className="">
                                    <MdDeleteOutline className='text-xl text-red-700 cursor-pointer'
                                        onClick={() => {

                                            setValue('gallery', values?.gallery?.filter((prevItem) => prevItem !== item))
                                        }}

                                    />
                                </div>
                            </div>

                        </div>
                        {renderTypography}
                        <ImageInput
                            // label='Gallery'
                            values={item.link?.length ? [item.link] : []}
                            path={`customer-site-components/gallery`}
                            onSuccess={(e) => {
                                console.log(e)
                                // setValue('links.icon', e[0])
                            }}
                        />
                    </div>
                </div>)
            })}


        </div>
        {/* {values.isGallery && (<div className="">
            <ImageInput
                values={values.gallery?.length ? values.gallery?.map((row) => row.link) : []}
                path={`customer-site-components/gallery`}
                onSuccess={(e) => {
                    console.log(e)
                }}
            />
        </div>)} */}

        {/* {renderErrorMessage('links.icon.message')} */}

    </div>
}
type TProps = { variant: 'desktop' | 'mobile' }

type TViewPortMedia = {
    // links: TComponentLink,
    // icons: TComponentMediaItem[],
    gallery: TComponentMediaItem[],
    isGallery: boolean
}
