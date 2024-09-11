import { useCallback, useState } from 'react';

export default function FormToggle(props: TProps) {
    const { checked = false, onToggle } = props;
    const [isChecked, setIsChecked] = useState(checked);
    const handleToggle = useCallback(() => {
        setIsChecked(!isChecked);
        if (onToggle) {
            onToggle(!isChecked);
        }
    }, [isChecked, onToggle]);

    return (<div
        className={`relative inline-flex items-center h-6 w-11 cursor-pointer ${isChecked ? 'bg-indigo-500' : 'bg-gray-300'
            } rounded-full transition-colors duration-200`}
        onClick={handleToggle}
    >
        <span
            className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-lg transition-transform duration-200 ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}
        />
    </div>
    );
}


type TProps = {
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
};
