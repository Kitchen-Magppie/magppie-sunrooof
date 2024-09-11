import Form from '../components/Form'
import { useAppSelector } from '../../../../../redux'

type TProps = { id?: string; closeModal?: VoidFunction }

export default function UserCreateEdit(props: TProps) {
    const { id = 'create', closeModal } = props
    const users = useAppSelector(({ Cms }) => Cms.SuperUsers.value)
    const currentUser = users?.find((row) => row.id === id)

    return (
        <div>
            <div className="max-w-screen-xl flex flex-col justify-between mx-auto p-4 mt-4">
                <Form item={currentUser} id={id} closeModal={closeModal} />
            </div>
        </div>
    )
}
