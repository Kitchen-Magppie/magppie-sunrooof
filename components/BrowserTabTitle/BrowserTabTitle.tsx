import { ReactNode, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; export function BrowserTabTitle(props: IProps) {
    useEffect(() => {
        document.title = props.message
    }, [props.message])
    return (<HelmetProvider>

        <Helmet>
            <title>{props.message}</title>
            <meta name="description" content={props.message} />
        </Helmet>
        {props.children}
    </HelmetProvider>);
}
interface IProps { message: string, children?: ReactNode }

