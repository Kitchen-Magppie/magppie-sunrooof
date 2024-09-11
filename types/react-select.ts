import { StylesConfig } from "react-select"

export const REACT_SELECT_DESKTOP_STYLES: StylesConfig = {
    input(base) {
        return ({
            ...base,
            outline: "none",
        })
    },

    placeholder(base) {
        return ({ ...base, color: "#d1d5db" })
    },
    singleValue(base) {
        return ({ ...base, color: "white" })
    },
    control(base) {
        return ({
            ...base,
            color: "white",
            boxShadow: 'none',
            border: "1px solid #d1d5db",
            '&:hover': {
                outline: "1px solid #d1d5db",
                border: '1px solid white'
            },
            background: "#1E1E1E",
            borderRadius: "20px",
            paddingLeft: "1.8rem",
            paddingBlock: "0.1rem",
            outline: 'none',
        })
    },
    menu(base) {
        return ({
            ...base,
            // background: "transparent",
            // opacity: 0.1,
            border: "1px solid white",
            background: "#1E1E1E",
            color: "white",
            padding: "2px",
            borderRadius: "12px"
        })
    },
    option(base, props) {
        const index = props.options?.findIndex((row) => row === props.data)
        return ({
            ...base,
            background: "#1E1E1E",
            borderTop: index ? "1px solid #d1d5db" : "none",
            color: "#d1d5db",

            ":hover": {
                color: "white",
                borderTop: index ? "1px solid white" : "none",
            },
            cursor: "pointer"
        })
    },
}
