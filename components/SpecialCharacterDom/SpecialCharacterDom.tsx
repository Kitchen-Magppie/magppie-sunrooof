import { SPECIAL_CHARACTER_TO_DOM } from "../../types";
export default function SpecialCharacterDom(props: TProps) {
    return SPECIAL_CHARACTER_TO_DOM(props.text);
}
type TProps = { text: string }

