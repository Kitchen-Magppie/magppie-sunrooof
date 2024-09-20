import _ from "lodash";
//====================================================================
type TApplyOrder = { original: string[], prev: string[], prefer: string }

interface TLodashMixin extends _.LoDashStatic {
    titleCase: (e: string) => string,
    labelCase: (e: string) => string,
    isNumericString: (e: string) => boolean,
    mapNums: (e: unknown[]) => number[],
    applyOrder: (e: string[]) => TApplyOrder
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
_.mixin({
    titleCase,
    labelCase,
    isNumericString,
    mapNums,
    applyOrder
})
export default _ as TLodashMixin
