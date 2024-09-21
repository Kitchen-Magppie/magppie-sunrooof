import { useCallback, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { MdDeleteOutline } from "react-icons/md";
//====================================================================
import { TComponentTypography, _ } from "../../../../../types"

type TProps = { index: number }
export default function FormItemTypography({ index }: TProps) {

    const methods = useFormContext<{ components: { items: TComponentTypography[] }[], name: string }>()
    const { register, formState: { errors }, watch, setValue } = methods
    const values = watch()

    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return <p className="text-red-500 text-xs mt-1">
                {_.get(errors, `components.${index}.items.${field}.message`)}
            </p>
        }
        return ''
    }, [errors, index])

    const data = useMemo(() => (_.get(values, `components.${index}.items`, [])), [index, values])

    return data.map((typography, i) => {

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
                            {...register(`components.${index}.items.${i}.main`)}
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
                            {...register(`components.${index}.items.${i}.secondary`)}
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
                            {...register(`components.${index}.items.${i}.subtitle`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${index}.items.${i}.subtitle`)}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Action
                        </label>
                        <input
                            type="text"
                            {...register(`components.${index}.items.${i}.action`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${index}.items.${i}.action`)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            {...register(`components.${index}.items.${i}.description`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${index}.items.${i}.description`)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Secondary Description
                        </label>
                        <input
                            type="text"
                            {...register(`components.${index}.items.${i}.secondaryDescription`)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${index}.items.${i}.secondaryDescription`)}
                    </div>
                </div>

                <div >
                    <MdDeleteOutline className='text-xl text-red-700 cursor-pointer'
                        onClick={() => {
                            setValue(`components.${index}.items`, data?.filter((item) => item !== typography))
                        }}
                    />
                </div>

            </div>
        </div>)
    })
}
