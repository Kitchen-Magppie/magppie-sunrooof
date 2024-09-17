import { ReactNode, useCallback, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function MinimalAccordion(props: IProps) {
    const [toggle, setToggle] = useState(props?.isExpanded || false);
    const onToggle = useCallback(() => { setToggle((prev) => !prev); }, []);
    return (<div className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-2">
        <button
            type='button'
            className="w-full flex justify-between items-center p-2 text-left focus:outline-none"
            onClick={onToggle}
        >
            <span className="text-lg font-medium flex items-center gap-2">{props?.icon}{props.title}</span>
            <span>
                {toggle ? <FaChevronUp /> : <FaChevronDown />}
            </span>
        </button>
        {toggle && (<div className={`transition-all duration-500  p-4`}>{props.children}</div>)}

        {/* <div className={`transition-all duration-500 overflow-hidden ${toggle ? 'max-h-screen p-4' : 'max-h-0'}`}>{props.children}</div> */}
    </div>
    );
}

interface IProps {
    title: string;
    icon?: ReactNode,
    isExpanded?: true,
    children: ReactNode;
}

