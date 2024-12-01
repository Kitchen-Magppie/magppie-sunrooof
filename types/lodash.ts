import { v4 as uuidv4 } from 'uuid';
//====================================================================
import _ from "lodash";
type TApplyOrder = { original: string[], prev: string[], prefer: string }
type TLabelify = { value: string, label: string }
type TDownload = { url: string, name: string }

type TFromCanvasElementToFile = { element: HTMLCanvasElement, name: string, type: string }
// type TBase64ToFile=
interface TLodashMixin extends _.LoDashStatic {
    labelify: (e: string[]) => TLabelify[]
    titleCase: (e: string) => string,
    labelCase: (e: string) => string,
    isNumericString: (e: string) => boolean,
    mapNums: (e: unknown[]) => number[],
    applyOrder: (e: string[]) => TApplyOrder,
    uuid: () => string,
    download: (e: TDownload) => void,
    dataURLtoBlob: (e: string) => Blob,
    fromCanvasElementToFile: (e: TFromCanvasElementToFile) => File,
    base64ToFile: (content: string, fileName: string) => File
    fromStrToSentence: (arr: string[]) => string
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
function dataURLtoBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}
function download(args: TDownload): void {
    const link = document.createElement('a');
    link.download = args.name;
    link.href = args.url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function fromCanvasElementToFile(e: TFromCanvasElementToFile) {
    const dataURL = e.element.toDataURL(e.type);

    // Create a Blob object
    const blob = new Blob([dataURL], { type: e.type });

    // Create a File object
    const file = new File([blob], e.name, { type: e.type });
    return file
}

function base64ToFile(base64String: string, fileName: string) {
    const imageType = base64String.split(';')[0].split(':')[1];
    const byteString = atob(base64String.split(',')[1]);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: imageType });
    return new File([blob], fileName, { type: imageType });
}

function fromStrToSentence(arr: string[]): string {
    const filteredArr = _.uniq(arr.filter(str => str.trim() !== ''))?.sort(); // Remove empty strings

    if (filteredArr.length === 0) {
        return ''; // Handle empty array
    } else if (filteredArr.length === 1) {
        return filteredArr[0];
    } else if (filteredArr.length === 2) {
        return filteredArr.join(' & ');
    } else {
        const lastIndex = filteredArr.length - 1;
        return filteredArr.slice(0, lastIndex).join(', ') + ' & ' + filteredArr[lastIndex];
    }
}
_.mixin({
    download,
    labelify,
    titleCase,
    labelCase,
    isNumericString,
    mapNums,
    applyOrder,
    uuid,
    dataURLtoBlob,
    fromCanvasElementToFile,
    base64ToFile,
    fromStrToSentence
})
export default _ as TLodashMixin
