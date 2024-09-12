import { FaPlus } from 'react-icons/fa'
import { useMemo, useState } from 'react'
import _ from 'lodash'
//====================================================================

import Card from './components/Card'
import { Search } from './../../components'
import { useFirebaseCmsProjectsListener } from '../../utils/firebase/use-firebase-cms-listeners'
import { useAppSelector } from '../../../../redux'
import Modal from './components/Modal'
import PageProgress from '../../../../components/PageProgress'

export default function Projects() {
    const [modalId, setIsModalId] = useState('')
    const openModal = (id = 'create') => setIsModalId(id)
    const closeModal = () => setIsModalId('')

    useFirebaseCmsProjectsListener()
    const { loading, value } = useAppSelector((state) => state.Cms.Projects)
    const [search, setSearch] = useState('')

    const projects = useMemo(() => {
        return value?.filter((item) =>
            search?.length
                ? _.lowerCase(item.name)?.includes(_.lowerCase(search))
                : true
        )
    }, [search, value])

    return (
        <div>
            <Search
                placeholder="Search Projects.."
                onChange={(e) => {
                    setSearch(e)
                }}
            />
            <div className="mt-10">
                {loading ? (
                    <PageProgress />
                ) : (
                    <div className="mt-10">
                        {projects?.length ? (
                            <div className="gap-6 grid grid-cols-2 md:grid-cols-3 max-w-screen-2xl mx-auto place-items-center">
                                {projects?.map((item, i) => (
                                    <Card
                                        openModal={openModal}
                                        item={item}
                                        key={i}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-row justify-center h-20 align-middle">
                                Not found
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div
                className="fixed bottom-4 left-1/2 transform cursor-pointer -translate-x-1/2 z-50 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 flex gap-3"
                onClick={() => openModal()}
            >
                <FaPlus className="w-3 h-3 my-auto" />
                Add Project
            </div>
            <Modal id={modalId} closeModal={closeModal} />
        </div>
    )
}
