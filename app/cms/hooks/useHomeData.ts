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
import { useParams } from "react-router-dom";

export default function useHomeData() {
    useFirebaseCmsCustomerListener()
    const params = useParams()
    const { loading, value } = useAppSelector((state) => state.Cms.Customer);
    const components = useMemo(() => {
        const data = value.find((row) => {
            if ('id' in params) {
                return params.id === row.id
            }
            return row.customerId === DEFAULT_CUSTOMER.customerId
        })
        return ({
            [CustomerComponentEnum.Comparison]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Comparison) as unknown as TCustomerComponentComparisonItem,
            [CustomerComponentEnum.Client]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Client) as unknown as TCustomerComponentClientItem,
            [CustomerComponentEnum.TwoDDesign]: data?.components?.find(({ value }) => value === CustomerComponentEnum.TwoDDesign) as unknown as TCustomerComponentDesign2DItem,
            [CustomerComponentEnum.ThreeDDesign]: data?.components?.find(({ value }) => value === CustomerComponentEnum.ThreeDDesign) as unknown as TCustomerComponentDesign3DItem,
            [CustomerComponentEnum.Quotation]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Quotation) as unknown as TCustomerComponentQuotationItem,
        })

    }, [params, value])
    return ({ loading, components })
}
