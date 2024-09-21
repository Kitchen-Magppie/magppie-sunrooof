// import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
//====================================================================

// import { _ } from "../../../../../types"

export default function FormTypography({ index }: TProps) {
    const {
        register,
        // formState: { errors }
    } = useFormContext()

    // const renderErrorMessage = useCallback((field: string) => {
    //     return _.get(errors, field) && <p className="text-red-500 text-xs mt-1">
    //         {_.get(errors, `${field}.message`)}
    //     </p>
    // }, [errors])
    return <div className="ms-1">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Main
            </label>
            <input
                type="text"
                {...register(`components.${index}.typography.main`)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* {renderErrorMessage(`components.${index}.typography.main`)} */}
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <input
                type="text"
                {...register(`components.${index}.typography.description`)}
                className="mt-1 block w-full p d-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* {renderErrorMessage(`components.${index}.typography.description`)} */}
        </div>
    </div>
}
type TProps = { index: number }
