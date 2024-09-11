import _ from "lodash";
//====================================================================

interface TLodashMixin extends _.LoDashStatic {
    titleCase: (e: string) => string,
    labelCase: (e: string) => string
}

const titleCase = (str: string) => _.startCase(_.camelCase(str))

const labelCase = (str: string) => titleCase(str?.replace(/-/g, ' ')?.replace(/_/g, ' '))

_.mixin({
    titleCase,
    labelCase
})
export default _ as TLodashMixin
