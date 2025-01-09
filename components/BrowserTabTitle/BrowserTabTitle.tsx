import { ReactNode, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export function BrowserTabTitle(props: IProps) {
    useEffect(() => {
        document.title = props.message
    }, [props.message])
    return (<HelmetProvider>

        <Helmet>
            <title>{props.message}</title>
            <meta name="description" content={props.message} />
            {/* <meta name="keywords" content="keyword1, keyword2, keyword3" /> */}
            <meta property="og:title" content={props.message} />
            <meta property="og:description" content={props.message} />
            <meta property="og:image" content="/favicon.png" />
            {/* <meta property="og:url" content="https://your-website-url.com/path/to/page" /> */}
            <meta property="og:site_name" content={props.message} />
            <meta property="og:type" content="website" />
            {/* <meta name="twitter:card" content="summary_large_image" /> */}
            {/* <meta name="twitter:site" content="@your_twitter_handle" /> */}
            {/* <meta name="twitter:creator" content="@your_twitter_handle" /> */}
            <meta name="twitter:title" content={props.message} />
            <meta name="twitter:description" content={props.message} />
            <meta name="twitter:image" content="/favicon.png" />
        </Helmet>
        {props.children}
    </HelmetProvider>);
}

interface IProps { message: string, children?: ReactNode }

