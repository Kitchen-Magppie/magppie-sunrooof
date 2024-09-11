import Select from "react-select"
import { CONSULT_CITIES } from "../../mocks"
import { REACT_SELECT_DESKTOP_STYLES } from "../../types/react-select"
export default function CustomAutocompleteExample() {
    return <Select
        // theme={(theme) => {
        //     return ({
        //         ...theme,
        //         text: 'white',
        //         primary: '#1E1E1E',
        //         primary25: '#d1d5db'

        //     })
        // }}
        styles={REACT_SELECT_DESKTOP_STYLES}
        onChange={(e) => {
            console.log(e)
        }}
        options={CONSULT_CITIES?.map((value) => ({ value, label: value }))} />
}
