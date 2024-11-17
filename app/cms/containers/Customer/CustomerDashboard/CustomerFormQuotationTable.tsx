import { useMemo } from "react";
import { TCustomerComponentDesign2DItem, TCustomerComponentQuotationItem } from "../../../../../types";
import { CMS_QUOTATION_OPTIONS } from "../../../mocks";

type TProps = {
    quotation: TCustomerComponentQuotationItem
    item: TCustomerComponentDesign2DItem
}
function CustomerFormQuotationTable(props: TProps) {
    const data = props.quotation as TCustomerComponentQuotationItem;

    const row = useMemo(() => {
        const totalGrossAmount = TO_TOTAL_GROSS_AMOUNT(props.item);
        const discountAmount =
            totalGrossAmount * (data.data.discount / 100);
        const totalAmount =
            totalGrossAmount - discountAmount + freightCharges;
        const taxAmount = totalAmount * (18 / 100);
        const grandTotal = totalAmount + taxAmount;

        return ({
            taxAmount,
            totalGrossAmount,
            discountAmount,
            totalAmount,
            grandTotal

        })
    }, [data.data.discount, props.item])

    return (<table style={{ width: "100%" }}>
        <thead className="bg-[darkorange]">
            <tr className="">
                <th className="border border-black py-2 px-4">
                    S.No
                </th>
                <th className="border text-start border-black py-2 px-4">
                    Design and Finish
                </th>
                <th className="border border-black text-start py-2 px-4">
                    Area
                </th>
                <th className="border border-black py-2 px-4">
                    Floor
                </th>
                <th className="border border-black py-2 px-4">
                    Qty
                </th>
                <th className="border border-black py-2 px-4">
                    Unit Price
                </th>
                <th className="border border-black py-2 px-4">
                    Total Price
                </th>
            </tr>
        </thead>
        <tbody>
            {props.item.data.map((entry, index) => {
                const price =
                    CMS_QUOTATION_OPTIONS[entry.design]?.[
                    entry.finish
                    ] || 0;
                const total = price * (entry.quantity || 1);

                return (
                    <tr
                        key={index}
                        className="border-b border-black"
                    >
                        <td className="border border-black text-center px-4 py-2">
                            {index + 1}
                        </td>
                        <td className="border border-black px-4 py-2">
                            {entry.design} {entry.finish}
                        </td>
                        <td className="border border-black px-4 py-2">
                            {entry.areaName}
                        </td>
                        <td className="border border-black text-center px-4 py-2">
                            {entry.floor}
                        </td>
                        <td className="border border-black text-center px-4 py-2">
                            {entry.quantity}
                        </td>
                        <td className="border border-black text-center px-4 py-2">
                            ₹{price.toLocaleString()}
                        </td>
                        <td className="border border-black text-center px-4 py-2">
                            ₹{total.toLocaleString("en-IN")}
                        </td>
                    </tr>
                );
            })}
            {/* After all entries, render the totals */}
            <tr className="font-bold">
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Gross Amount
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{row?.totalGrossAmount.toLocaleString("en-IN")}
                </td>
            </tr>
            <tr>
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Discount %
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    {data.data.discount}%
                </td>
            </tr>
            <tr>
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Discount Amount
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{row?.discountAmount.toLocaleString("en-IN")}
                </td>
            </tr>
            <tr>
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Freight Charges
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{freightCharges.toLocaleString()}
                </td>
            </tr>
            <tr className="font-bold">
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Total
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{row?.totalAmount.toLocaleString("en-IN")}
                </td>
            </tr>
            <tr>
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Tax @ 18%
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{row?.taxAmount.toLocaleString("en-IN")}
                </td>
            </tr>
            <tr className="font-bold">
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Grand Total
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{row?.grandTotal.toLocaleString("en-IN")}
                </td>
            </tr>
        </tbody>
    </table>
    );

}

const TO_TOTAL_GROSS_AMOUNT = (item: TCustomerComponentDesign2DItem) => {

    // Step 1: Calculate Total Gross Amount Directly
    let totalGrossAmount = 0;

    if (item && Array.isArray(item.data) && item.data.length > 0) {
        totalGrossAmount = item.data.reduce((acc, entry) => {
            const price = CMS_QUOTATION_OPTIONS[entry.design]?.[entry.finish] || 0;
            const total = price * (entry.quantity || 1);
            return acc + total;
        }, 0);
    }
    return totalGrossAmount
}
const freightCharges = 50000;

export default CustomerFormQuotationTable;


