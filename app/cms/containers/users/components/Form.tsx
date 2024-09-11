import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
// import { IoMdClose } from 'react-icons/io'
// import { ChangeEvent, useCallback, useMemo, useState } from 'react'
// import {
//     StorageError,
//     UploadTaskSnapshot,
//     getDownloadURL,
//     ref,
//     uploadBytesResumable,
// } from 'firebase/storage'
// import { db, storageApp } from '../../../../../config/firebase.config'
// import CircularProgress from '../../../../../components/CircularProgress'
// import { collection, doc } from 'firebase/firestore'
// import CircularProgress from '../../../../../components/CircularProgress'
import { ISuperUser } from '../../../types/SuperUser'
import { useFirebaseCmsUserAction } from '../../../utils/firebase/users/actions'
import { toast } from 'react-toastify'

type TProps = { item?: ISuperUser; id: string; closeModal: () => void }

// interface ImageData {
//     id: number
//     src: string
//     file: File
//     url?: string
// }

const Form = (props: TProps) => {
    const userActions = useFirebaseCmsUserAction()
    // const navigate = useNavigate()

    // const generateDocumentId = useMemo(() => {
    //     const colRef = collection(db, 'users')
    //     const docRef = doc(colRef)
    //     return docRef.id
    // }, [])

    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
    })

    const defaultValues = {
        name: _.get(props, 'item.name', ''),
        email: _.get(props, 'item.email', ''),
    }

    // const defaultValues = useMemo(
    //     () => ({
    //         id: props?.item?.id?.length ? props.item.id : generateDocumentId,
    //         name: _.get(props.item, 'name', ''),
    //         description: _.get(props.item, 'description', ''),
    //         images: props?.item?.image,
    //     }),
    //     [generateDocumentId, props.item]
    // )
    // const [images, setImages] = useState<ImageData[]>([])

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    })
    // const handleRemoveImage = useCallback(
    //     (id: number) => {
    //         setImages(images.filter((image) => image.id !== id))
    //     },
    //     [images]
    // )

    // const onUploadImages = useCallback(
    //     (files: File[]) => {
    //         const onUploadTaskSnapshot = (snap: UploadTaskSnapshot) => {
    //             const uploading = Math.round(
    //                 (snap.bytesTransferred / snap.totalBytes) * 100
    //             )
    //             if (uploading === 100) {
    //                 console.log('Success')
    //             }
    //         }
    //         const onStorageError = (error: StorageError) => {
    //             console.log(error)
    //         }
    //         files?.forEach((image) => {
    //             const fileName = `${+new Date()}_${image.name}`
    //             const storageRef = ref(
    //                 storageApp,
    //                 `kitchens/${defaultValues.id}/${fileName}`
    //             )
    //             console.log(fileName)
    //             const uploadTask = uploadBytesResumable(storageRef, image)

    //             const onUploadComplete = () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((link) => {
    //                     if (link?.length) {
    //                         setImages((prev) =>
    //                             prev?.map((row) => {
    //                                 return {
    //                                     ...row,
    //                                     url:
    //                                         image.name === row.file.name
    //                                             ? link
    //                                             : `${row.url || ''}`,
    //                                 }
    //                             })
    //                         )
    //                     }
    //                 })
    //             }
    //             uploadTask.on(
    //                 'state_changed',
    //                 onUploadTaskSnapshot,
    //                 onStorageError,
    //                 onUploadComplete
    //             )
    //         })
    //     },
    //     [defaultValues.id]
    // )

    const onSubmit = handleSubmit((data) => {
        if (props.id === 'create') {
            // const links = images?.map((row) => _.get(row, 'url', ''))
            userActions.add({ ...data })
            toast('User Added')
        } else {
            userActions.edit({ ...data, id: props.id })
            toast('User Updated')
        }
        // toastAction({message:, color:})
        props.closeModal()
    })

    // const uploading = useMemo(
    //     () =>
    //         images?.filter((row) => row.url?.length)?.length !== images?.length,
    //     [images]
    // )

    // const onChangeFile = useCallback(
    //     (e: ChangeEvent<HTMLInputElement>) => {
    //         const files = Array.from(e.target.files || [])

    //         const newImages = files.map((file, index) => ({
    //             id: Date.now() + index,
    //             src: URL.createObjectURL(file),
    //             file,
    //         }))
    //         setImages((prev) => [...prev, ...newImages])

    //         onUploadImages(files)
    //     },
    //     [onUploadImages]
    // )

    // const renderImageList = useMemo(
    //     () => (
    //         <div className="flex flex-wrap">
    //             {images.map((image) => (
    //                 <div key={image.id} className="relative my-2 ">
    //                     <img
    //                         src={image.src}
    //                         alt=""
    //                         className="w-32 h-32 object-cover rounded-lg ms-1"
    //                     />
    //                     <button
    //                         onClick={() => handleRemoveImage(image.id)}
    //                         className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
    //                     >
    //                         <IoMdClose />
    //                         {/* &times; */}
    //                     </button>
    //                 </div>
    //             ))}
    //         </div>
    //     ),
    //     [handleRemoveImage, images]
    // )
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
                    {...register('name')}
                    name="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                />
            </div>
            <div className="">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <input
                    {...register('email')}
                    name="email"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                />
            </div>
            {/* </div> */}

            {/* <div>
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    Upload Kitchen Media
                </label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    multiple
                    onChange={onChangeFile}
                    value={[]}
                    type="file"
                    //  accept="image/*"
                />
            </div> */}
            {/* {renderImageList} */}
            {/* {uploading ? <CircularProgress /> : renderImageList} */}
            {/* {renderImageList} */}
            {/* <CustomCircularProgress /> */}
            <button
                // disabled={uploading}
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
                {props?.item?.id ? 'Edit' : 'Add'} User
            </button>
        </form>
    )
}

export default Form

// const schema = yup.object({
//     name: yup.string().required('Name is required'),
//     description: yup.string().required('Name is required'),
//     images: yup.array().of(yup.string()),
// })
