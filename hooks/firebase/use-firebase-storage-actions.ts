import { useCallback } from "react"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
//====================================================================

import { storageApp } from "../../config/firebase.config"
import _ from "../../types/lodash"

export default function useFirebaseStorageActions() {

    const upload = useCallback(async (params: TUpload) => {
        const { file, onSuccess } = params
        if (file?.size) {
            const fileName = `${+new Date()}_${file.name}`
            const storageRef = ref(storageApp, params?.path?.length ? `${params?.path}/${fileName}` : fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snap) => {
                    const percent = _.round((snap.bytesTransferred / snap.totalBytes) * 100)
                    if (params?.onObserve) {
                        params?.onObserve(percent)
                    }
                },
                (error) => {
                    console.log(error)
                }, async () => {
                    const link = await getDownloadURL(uploadTask.snapshot.ref)
                    if (link?.length) {
                        onSuccess({ file, link })
                    }
                }
            )
        }

    }, [])

    const remove = useCallback((link: string) => {
        const fileRef = ref(storageApp, link)
        return deleteObject(fileRef)
    }, [])


    return ({
        upload,
        remove,
        batch: {
            remove: (links: string[]) => {
                links?.forEach((link) => { remove(link) })
            },
            upload: (params: { files: File[], path: string, onSuccess: (e: string[]) => void }) => {

                if (params?.files?.length) {
                    const links = params?.files?.map((file) => {
                        return new Promise<string>((resolve, reject) => {
                            const input = {
                                file,
                                path: params.path,
                                onSuccess: ({ link }) => resolve(link)
                            }
                            upload(input).catch((e) => {
                                reject(e)
                            })
                        })

                    })

                    Promise.all(links)?.then((e) => { params?.onSuccess(e) })
                }

            }
        }

    })
}

type TUpload = {
    file: File,
    path?: string,
    onObserve?: (e: number) => void,
    onSuccess: (e: { file: File, link: string }) => void

}
// type TValueItem = { file: File, link: string }
// type TCorpus = { values: TValueItem[], loading: boolean }
// const INIT_CORPUS: TCorpus = { values: [], loading: false };
