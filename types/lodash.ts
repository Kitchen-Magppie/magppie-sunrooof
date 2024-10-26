import { v4 as uuidv4 } from 'uuid';
//====================================================================
import _ from "lodash";
type TApplyOrder = { original: string[], prev: string[], prefer: string }
type TLabelify = { value: string, label: string }
type TDownload = { url: string, name: string }

interface TLodashMixin extends _.LoDashStatic {
    labelify: (e: string[]) => TLabelify[]
    titleCase: (e: string) => string,
    labelCase: (e: string) => string,
    isNumericString: (e: string) => boolean,
    mapNums: (e: unknown[]) => number[],
    applyOrder: (e: string[]) => TApplyOrder,
    uuid: () => string,
    download: (e: TDownload) => void
}


function titleCase(str: string) {
    return _.startCase(_.camelCase(str))
}

function labelCase(str: string) {
    return titleCase(str?.replace(/-/g, ' ')?.replace(/_/g, ' '))
}

function isNumericString(value: string) {
    return _.isString(value) && /^\d+$/.test(value);
}

function mapNums(value: string[]) {
    return value?.map((item) => Number(item));
}

function applyOrder(original: string[]): TApplyOrder {
    const prev = original?.filter((row) => isNumericString(row))
    const max = prev?.length ? _.max(mapNums(prev)) + 1 : 1
    const prefer = `${max}`
    return ({
        original,
        prev,
        prefer
    })
}
function uuid(): string {
    return uuidv4();
}

function labelify(e: string[]): TLabelify[] {
    return e?.map((value) => ({ value, label: value }))
}

function download(args: TDownload): void {
    const link = document.createElement('a');
    link.download = args.name;
    link.href = args.url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

_.mixin({
    download,
    labelify,
    titleCase,
    labelCase,
    isNumericString,
    mapNums,
    applyOrder,
    uuid
})
export default _ as TLodashMixin
