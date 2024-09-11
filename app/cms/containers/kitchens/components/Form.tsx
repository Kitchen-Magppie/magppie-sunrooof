import { useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { collection, doc } from 'firebase/firestore'
// ==========================================================================================
import { useFirebaseCmsKitchenAction } from '../../../utils/firebase'
import {
    CMS_KITCHEN_YUP_SCHEMA,
    INIT_YUP_KITCHEN,
    KITCHEN_TIER_OPTIONS,
    TKitchen
} from '../../../types/Kitchen'
import { db } from '../../../../../config/firebase.config'
import { ImageInput, SimpleDropdown } from '../../../../../components'
import { FirebaseCollectionEnum } from '../../../../../types'

export default function Form(props: TProps) {

    const KitchenActions = useFirebaseCmsKitchenAction()

    const generateDocumentId = useMemo(() => {
        const colRef = collection(db, FirebaseCollectionEnum.Kitchen)
        const docRef = doc(colRef)
        return docRef.id
    }, [])

    const defaultValues = useMemo(() => {
        const init = _.omit(INIT_YUP_KITCHEN, ['createdAt']);

        if (props.item) {
            return { ...init, ...props.item }
        }
        return ({
            ...init,
            id: props?.item?.id?.length ? props.item.id : generateDocumentId,
            name: _.get(props.item, 'name', ''),
            description: _.get(props.item, 'description', ''),
            specification: init.specification,
            images: { cabinet: _.get(props.item, 'images.cabinet', []), hero: `${_.get(props.item, 'images.hero', '') || ''}` }
        })
    }, [generateDocumentId, props])


    const {
        register,
        watch,
        handleSubmit,
        setValue
        // formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(CMS_KITCHEN_YUP_SCHEMA),
    })

    const values = watch()



    const onSubmit = handleSubmit((data) => {
        const result = _.omit(data, ['loading']) as TKitchen

        if (props?.item?.id?.length) {
            KitchenActions.edit(result)
            toast('Kitchen Updated')
        } else {
            KitchenActions.add(result)
            toast('Kitchen Added')
        }
        // toastAction({message:, color:})
        props.onCloseModal();
    })



    const newLocal = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5">
            {/* <div className="grid gap-6 mb-6 md:grid-cols-2"> */}
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Name
                </label>
                <input
                    defaultValue={_.get(values, 'specification.name', '')}
                    {...register('name')}
                    name="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                />
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <label
                        htmlFor="Price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        defaultValue={_.get(values, 'specification.price', '')}

                        {...register('specification.price')}
                        name="specification.price"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Price"
                    />
                </div>
                <div>
                    <label
                        htmlFor="area"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Area
                    </label>
                    <input
                        defaultValue={_.get(values, 'specification.area', '')}

                        {...register('specification.area')}
                        name="specification.area"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Area"
                    />
                </div>

                <div>
                    <label
                        htmlFor="shape"
                        className={newLocal}
                    >
                        Shape
                    </label>
                    <input
                        defaultValue={_.get(values, 'specification.shape', '')}

                        {...register('specification.shape')}
                        name="specification.shape"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Shape"
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        &nbsp;
                    </label>
                    <SimpleDropdown options={KITCHEN_TIER_OPTIONS}

                        onChange={(e) => {
                            setValue('specification.tier', e.value)
                        }}
                    />
                </div>
            </div>


            <div className="">
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Description
                </label>
                <textarea
                    rows={4}
                    defaultValue={_.get(values, 'description', '')}
                    {...register('description')}
                    name="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                />
            </div>
            <div>
                {/* <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="hero"
                >
                    Upload Hero Image
                </label> */}
                <ImageInput
                    label='Upload Hero Image'
                    path={`kitchens/cabinet/${defaultValues.id}`}
                    values={defaultValues.images.hero?.length ? [defaultValues.images.hero] : []}
                    onSuccess={(links) => { setValue(`images.cabinet`, links) }}
                />
            </div>
            <div>
                {/* <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    Upload Cabinet Media
                </label> */}
                <ImageInput
                    label='Upload Cabinet Media'
                    path={`kitchens/cabinet/${defaultValues.id}`}
                    values={defaultValues.images.cabinet}
                    isMulti
                    onSuccess={(links) => { setValue(`images.cabinet`, links) }}
                />
            </div>

            <button
                // disabled={uploading}
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
                {props?.item?.id ? 'Edit' : 'Add'} Kitchen
            </button>
        </form>
    )
}

type TProps = { item?: TKitchen, onCloseModal: () => void }

