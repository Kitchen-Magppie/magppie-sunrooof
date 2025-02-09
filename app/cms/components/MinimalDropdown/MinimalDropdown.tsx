import Select, { ActionMeta } from "react-select"

function MinimalDropdown(props: TProps) {
    return (<Select
        theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
                ...theme.colors,
                text: "white",
                primary25: "#3F51B5",
                primary: "#3F51B5",
            },
        })}
        placeholder={props?.placeholder}
        isDisabled={props?.isDisabled}
        classNames={{ control: () => AUTOCOMPLETE_STYLE }}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        options={props.options}
    />);
}

export default MinimalDropdown;
type TValueItem = { label: string, value: string }
type TProps = {
    onChange: (newValue: TValueItem, actionMeta: ActionMeta<TValueItem>) => void,
    defaultValue?: { label: string, value: string },
    options: TValueItem[],
    placeholder?: string
    isDisabled?: boolean
}
const AUTOCOMPLETE_STYLE =
    "mt-1 block w-full py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
