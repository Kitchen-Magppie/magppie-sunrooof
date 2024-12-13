import { useEffect, useState } from "react";

export function useDisableScroll(disable: boolean) {

    const [isDisabled, setIsDisabled] = useState(disable)

    useEffect(() => { setIsDisabled(disable) }, [disable])

    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = isDisabled ? "hidden" : previous;
        return () => {
            document.body.style.overflow = previous; // Cleanup
        };
    }, [isDisabled]);
}
