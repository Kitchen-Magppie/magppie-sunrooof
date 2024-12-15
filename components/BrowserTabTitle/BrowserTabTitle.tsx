import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

export function BrowserTabTitle(props: IProps) {
    return (<Helmet>
        <title>{props.message}</title>
        <meta name="description" content={props.message} />
    </Helmet>);
}
interface IProps { message: string, children?: ReactNode }

