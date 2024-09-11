import Form from "../../kitchens/components/Form"
import { useAppSelector } from '../../../../../redux'

type TProps = { id?: string; onCloseModal?: VoidFunction }

export default function SectionCreateEdit(props: TProps) {
    const { id, onCloseModal } = props
    const kitchens = useAppSelector(({ Cms }) => Cms.Kitchens.value)
    const currentKitchen = kitchens?.find((row) => row.id === id)

    return (
        <div>
            <div className="max-w-screen-xl flex flex-col justify-between mx-auto p-4 mt-4">
                <Form item={currentKitchen} onCloseModal={onCloseModal} />
            </div>
        </div>
    )
}
