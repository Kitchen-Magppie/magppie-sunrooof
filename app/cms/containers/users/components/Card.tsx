import { FaPen, FaUser } from 'react-icons/fa'
import { ISuperUser } from '../../../types/SuperUser'

type TProps = {
    item: ISuperUser
    openModal: (id?: string) => void
}

const Card = (props: TProps) => {
    return (
        <>
            <div className="w-10/12 p-6 bg-white border border-gray-200 rounded-lg shadow">
                <FaUser className="w-5 h-5 me-2" />
                <h5 className="mb-2 mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {props.item.name}
                </h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    {props.item.email}
                </p>
                <button
                    type="button"
                    onClick={() => props.openModal(props.item.id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Edit
                    <FaPen className="w-3 h-3 ml-2" />
                </button>
            </div>
        </>
    )
}

export default Card
