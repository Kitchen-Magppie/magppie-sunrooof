import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";

export function BrowserTabTitle(props: IProps) {
    useEffect(() => {
        document.title = props.message
    }, [props.message])
    return (<>

        <Helmet>
            <title>{props.message}</title>
            <meta name="description" content={props.message} />
        </Helmet>
        {props.children}
    </>);
}
interface IProps { message: string, children?: ReactNode }

