import { useFirebaseStorageActions } from "../../../../../hooks";
import { useAppSelector } from "../../../../../redux";
import {
    _,
    DOCUMENT_DELETATABLE_OPTIONS,
    TCustomerDeletableEnum,
    TCustomerItem
} from "../../../../../types";
import { useProposedLayoutAction, useProposedLayoutListener } from "../../../hooks";
import { useFirebaseCustomerAction } from "./use-firebase-customer-actions";

export function useFirebaseCustomerDeepDeletionAction() {
    useProposedLayoutListener()
    const proposedLayouts = useAppSelector((state) => state.Cms.ProposedLayout.value)

    const customerAction = useFirebaseCustomerAction()
    const proposedLayoutAction = useProposedLayoutAction()
    const storageAction = useFirebaseStorageActions()
    return ({
        confirm: (item: TCustomerItem) => {
            const options = DOCUMENT_DELETATABLE_OPTIONS({
                customer: item,
                layouts: proposedLayouts
            })
            if (options?.length) {
                const customer = _.find(options, { type: TCustomerDeletableEnum.Customer })
                const customerPropsedLayouts = _.filter(options, { type: TCustomerDeletableEnum.ProposedLayout })
                const customerLinks = _.filter(options, { type: TCustomerDeletableEnum.Link })

                if (customerPropsedLayouts?.length) {
                    proposedLayoutAction.batch.remove(_.map(customerPropsedLayouts, 'value'))
                }
                if (customerLinks?.length) {
                    storageAction.batch.remove(_.map(customerLinks, 'value'))
                }
                return customerAction.remove(customer.value)
            }

        }
    });
}
