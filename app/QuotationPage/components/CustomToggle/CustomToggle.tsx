import { useCallback, useState } from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// ======================================================================
// import illustration from "./growth.svg"

export function ToggleButton(props: TProps) {

    const [isLeft, setIsLeft] = useState(true)

    const onClickToggle = useCallback(() => {
        setIsLeft((prev) => !prev)
        if (props?.onToggle) {
            props.onToggle(isLeft)
        }
    }, [isLeft, props])

    return (<div className='flex items-center justify-center'>
        <div
            onClick={onClickToggle}

            style={{
                boxShadow: "inset 3px 10px 10px 2px rgba(0,0,0,0.2)"
            }}
            className={`${isLeft ? 'bg-gray-300' : 'bg-gray-200'
                } relative inline-flex h-24 w-72 items-center rounded-full transition-colors duration-300 cursor-pointer focus:outline-none`}
        >
            <span
                style={{
                    boxShadow: "3px 10px 10px 2px rgba(0,0,0,0.2)",
                }}
                className={`${isLeft ? 'translate-x-3' : 'translate-x-48'
                    } inline-block h-20 w-20 transform bg-white rounded-full transition-transform duration-300`}
            />
        </div>
        {/* <button
            onClick={onClickToggle}
            className={`relative w-full flex items-center rounded-full bg-[#ffffff] text-black`}
            style={{
                boxShadow: "inset 3px 10px 10px 2px rgba(0,0,0,0.2)"
            }}
        >
            <div
                className={`flex items-center justify-center w-32 h-5w-48 rounded-full bg-[#202620] absolute`}
                style={{
                    left: isLeft ? 0 : 'calc(100% - 8rem)',
                    transition: 'left 0.5s ease-in-out',
                }}
            >
                <LazyLoadImage
                    src={illustration}
                    alt="Icon"
                    className=" bg-[#202620] rounded-full w-full"
                    style={{
                        zIndex: 1,
                        boxShadow: "3px 10px 10px 2px rgba(0,0,0,0.2)",
                    }}
                />
            </div>
            <div className={`p-[40px] text-[32px] transition-opacity duration-300 ${isLeft ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-96 text-left ps-16">
                    After
                </div>
            </div>
            <div className={`grid grid-cols-2 text-[32px] transition-opacity duration-300 absolute ${isLeft ? 'opacity-100' : 'opacity-0'}`}>
                <div />
                <div className=" w-72 text-left">
                    Before
                </div>
            </div>
        </button> */}
    </div>)
}

export default ToggleButton
type TProps = { onToggle?: (e: boolean) => void }
