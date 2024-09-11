import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useFirebaseCmsProjectAction } from '../../../utils/firebase/projects/actions'
import _ from 'lodash'
import { TProject } from '../../../types/Project'
import Select from 'react-select'
import { useAppSelector } from '../../../../../redux'
import { useFirebaseCmsKitchensListener } from '../../../utils/firebase/use-firebase-cms-listeners'
import { toast } from 'react-toastify'

type TProps = { item?: TProject; id: string; closeModal: () => void }

const Form = (props: TProps) => {
    const ProjectActions = useFirebaseCmsProjectAction()

    const schema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        kitchenIds: yup.array().of(yup.string()),
    })

    const defaultValues = {
        name: _.get(props, 'item.name', ''),
        description: _.get(props, 'item.description', ''),
        kitchenIds: _.get(props, 'item.kitchenIds', []) as string[],
    }

    const { register, handleSubmit, setValue } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    })

    const onSubmit = handleSubmit((data) => {
        if (props.id === 'create') {
            ProjectActions.add({ ...data })
            toast('Project Added')
        } else {
            ProjectActions.edit({ ...data, id: props.id })
            toast('Project Updated')
        }
        props.closeModal()
    })

    useFirebaseCmsKitchensListener()
    const kitchens = useAppSelector((state) => state.Cms.Kitchens.value)
    const options = kitchens?.map((row) => ({ label: row.name, value: row.id }))

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 mb-6 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select Kitchen
                    </label>
                    <Select
                        isMulti
                        defaultValue={defaultValues?.kitchenIds?.map((id) =>
                            options?.find((option) => option.value === id)
                        )}
                        onChange={(arr) => {
                            setValue('kitchenIds', _.uniq(_.map(arr, 'value')))
                        }}
                        options={options}
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        id="description"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        defaultValue={''}
                    />
                </div>
                {/* <div>
                    <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite"
                        required
                    />
                </div>
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                    >
                        Upload Kitchen Media
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                    />
                </div> */}
                {/* <div>
                    <Select label="Select Project" />
                </div>
                <div>
                    <Select label="Select Kitchens" />
                </div> */}
            </div>
            <button
                type="submit"
                className="text-white w-full bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
            >
                {props?.item?.id ? 'Edit' : 'Add'} Project
            </button>
        </form>
    )
}

export default Form
