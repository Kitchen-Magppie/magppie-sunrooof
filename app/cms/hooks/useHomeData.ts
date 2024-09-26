import { useMemo } from "react";
import { useAppSelector } from "../../../redux";
import { useFirebaseCmsCustomerListener } from "../utils/firebase";
import { DEFAULT_CUSTOMER } from "../mocks";
import {
    CustomerComponentEnum,
    TCustomerComponentClientItem,
    TCustomerComponentComparisonItem,
    TCustomerComponentDesign2DItem,
    TCustomerComponentDesign3DItem,
    TCustomerComponentQuotationItem
} from "../../../types";

export default function useHomeData() {
    useFirebaseCmsCustomerListener()
    const { loading, value } = useAppSelector((state) => state.Cms.Customer);
    const components = useMemo(() => {
        const data = value.find((row) => row.customerId === DEFAULT_CUSTOMER.customerId)
        return ({
            [CustomerComponentEnum.Comparison]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Comparison) as unknown as TCustomerComponentComparisonItem[],
            [CustomerComponentEnum.Client]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Client) as unknown as TCustomerComponentClientItem,
            [CustomerComponentEnum.TwoDDesign]: data?.components?.find(({ value }) => value === CustomerComponentEnum.TwoDDesign) as unknown as TCustomerComponentDesign2DItem,
            [CustomerComponentEnum.ThreeDDesign]: data?.components?.find(({ value }) => value === CustomerComponentEnum.ThreeDDesign) as unknown as TCustomerComponentDesign3DItem,
            [CustomerComponentEnum.Quotation]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Quotation) as unknown as TCustomerComponentQuotationItem,
        })

    }, [value])
    return ({ loading, components })
}
