import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
//====================================================================

import _ from "../../../../../types/lodash"
import { TComponentTypography } from "../../../../../types"

export default function FormTypography() {
    const { register, formState: { errors } } = useFormContext<{ typography: TComponentTypography }>()
    const renderErrorMessage = useCallback((field: string) => {
        return _.get(errors, field) && <p className="text-red-500 text-xs mt-1">
            {_.get(errors, `${field}.message`)}
        </p>
    }, [errors])
    return <div className="ms-1">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Main
            </label>
            <input
                type="text"
                {...register(`typography.main`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* {_.get(errors, 'typography.main') && <p className="text-red-500 text-xs mt-1">
                {_.get(errors, `typography.main.message`)}
            </p>} */}
            {renderErrorMessage(`typography.main`)}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Secondary
            </label>
            <input
                type="text"
                {...register(`typography.secondary`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            {renderErrorMessage(`typography.secondary`)}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Subtitle
            </label>
            <input
                type="text"
                {...register(`typography.subtitle`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {renderErrorMessage(`typography.subtitle`)}

        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Action
            </label>
            <input
                type="text"
                {...register(`typography.action`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {renderErrorMessage(`typography.action`)}

        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <input
                type="text"
                {...register(`typography.description`)}
                className="mt-1 block w-full p d-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {renderErrorMessage(`typography.description`)}

        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Secondary Description
            </label>
            <input
                type="text"
                {...register(`typography.secondaryDescription`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {renderErrorMessage(`typography.secondaryDescription`)}
        </div>
    </div>
}
