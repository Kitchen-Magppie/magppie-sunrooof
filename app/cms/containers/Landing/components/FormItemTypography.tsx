import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { MdDeleteOutline } from "react-icons/md";
//====================================================================
import { TComponentTypography } from "../../../../../types"
import _ from "../../../../../types/lodash"

export default function FormItemTypography() {

    const methods = useFormContext<{ items: TComponentTypography[] }>()
    const { register, formState: { errors }, watch, setValue } = methods
    const values = watch()

    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return <p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>
        }
        return ''
    }, [errors])

    return values.items.map((typography, i) => {

        return (<div key={i}>
            <div className="flex flex-row gap-2">
                <div className='text-xl text-gray-500 italic'>#{i + 1}.</div>
                <div className='w-full'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Main
                        </label>
                        <input
                            type="text"
                            {...register(`items.${i}.main`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`items.${i}.main`)}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Secondary
                        </label>
                        <input
                            type="text"
                            {...register(`items.${i}.secondary`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`items.${i}.secondary`)}

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Subtitle
                        </label>
                        <input
                            type="text"
                            {...register(`items.${i}.subtitle`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`items.${i}.subtitle`)}

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Action
                        </label>
                        <input
                            type="text"
                            {...register(`items.${i}.action`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`items.${i}.action`)}

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            {...register(`items.${i}.description`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`items.${i}.description`)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Secondary Description
                        </label>
                        <input
                            type="text"
                            {...register(`items.${i}.secondaryDescription`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`items.${i}.secondaryDescription`)}
                    </div>
                </div>

                <div >
                    <MdDeleteOutline className='text-xl text-red-700 cursor-pointer'
                        onClick={() => {
                            setValue('items', values?.items?.filter((item) => item !== typography))
                        }}
                    />
                </div>

            </div>
        </div>)
    })
}
