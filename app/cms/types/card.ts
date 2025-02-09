import { TCustomerItem } from "../../../types"

export enum CmsCardEnum {
    Complete = 'complete',
    Pending = 'pending',
    None = ''
}

export type TCmsCardVariant = CmsCardEnum.Complete | CmsCardEnum.Pending | CmsCardEnum.None
export type TCmsCustomerCardItem = {
    item: TCustomerItem
    onClickEditModal: VoidFunction,
    onClickDeleteModal: VoidFunction
}
