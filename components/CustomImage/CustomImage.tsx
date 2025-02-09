import { CSSProperties, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react/dist/iconify.js";

export function CustomImage(props: TProps) {
    const [corpus, setCorpus] = useState(INIT_CORPUS);

    useEffect(() => {
        const img = new Image();
        img.src = props.src;

        img.onload = () => {
            setCorpus({ isLoaded: true, error: null });
        };
    }, [props.src]);

    if (!corpus.isLoaded && !corpus.error) {
        return <Icon icon='line-md:loading-loop'
            style={{ color: "#0066FF" }}
            className={` text-5xl ${props.className}`}

        />
    }

    return corpus.isLoaded && (
        <LazyLoadImage effect={props.effect}
            src={props.src}
            alt={props.alt}
            className={props.className}
            style={props.style}
        />
    )

}

interface TCorpus {
    isLoaded: boolean;
    error: Error | null;
}

const INIT_CORPUS: TCorpus = {
    isLoaded: false,
    error: null,
}

type TProps = {
    src?: string,
    alt?: string
    effect?: "blur" | "black-and-white" | "opacity"
    className?: string,
    style?: CSSProperties

}
