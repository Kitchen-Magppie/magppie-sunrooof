import { MdClose } from 'react-icons/md'
import CreateEditProject from '../CreateEditProject'
import { Fragment } from 'react/jsx-runtime'

interface ModalProps {
    id: string
    closeModal: () => void
}

const Modal: React.FC<ModalProps> = ({ id, closeModal }) => {
    return (
        <Fragment key={id}>
            {/* Main modal */}
            {!!id && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                    <div className="relative p-4 w-full max-w-4xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {id === 'create' ? 'Add' : 'Edit'} Project
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={closeModal}
                                >
                                    <MdClose className="h-5 w-5" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <CreateEditProject
                                    id={id}
                                    closeModal={closeModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Modal
