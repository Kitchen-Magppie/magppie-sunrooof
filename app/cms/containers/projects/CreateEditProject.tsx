import Form from './components/Form'
import { useAppSelector } from '../../../../redux'
type TProps = { id?: string, closeModal?: VoidFunction }

export default function CreateEditProject(props: TProps) {
    const { id = 'create', closeModal } = props;
    const projects = useAppSelector(({ Cms }) => Cms.Projects.value)
    const currentProject = projects?.find((row) => row.id === id)

    return (
        <div>
            <div className="max-w-screen-xl flex flex-col justify-between mx-auto p-4 mt-4">
                <Form item={currentProject} id={id} closeModal={closeModal} />
            </div>
        </div>
    )
}

