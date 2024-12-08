import { useMemo } from "react";
import { _, TCustomerComponentDesign2DItem, TCustomerComponentQuotationItem } from "../../../../../types";
import { CMS_QUOTATION_OPTIONS } from "../../../mocks";


function CustomerFormQuotationTable(props: TProps) {
    const { rows, calc } = useMemo(() => {
        const { item, quotation } = props;
        return QUOTATION_TABLE_DATA(item, quotation?.data?.discount)
        // NOTE: Please don't remove this props array dependency. It helps to re-render on live changes;
    }, [props])

    return (<table style={{ width: "100%" }}>

        <QuotationTableHeader />
        <tbody>
            {rows.map((entry, index) => {
                return (<tr
                    key={index}
                    className="border-b border-black"
                >
                    <td className="border border-black text-center px-4 py-2">
                        {index + 1}
                    </td>
                    <td className="border border-black px-4 py-2">
                        {entry?.design} {entry?.finish}
                    </td>
                    <td className="border border-black px-4 py-2">
                        {entry?.area}
                    </td>
                    <td className="border border-black text-center px-4 py-2">
                        {entry?.floor}
                    </td>
                    <td className="border border-black text-center px-4 py-2">
                        {entry?.quantity}
                    </td>
                    <td className="border border-black text-center px-4 py-2">
                        ₹{entry.price.toLocaleString()}
                    </td>
                    <td className="border border-black text-center px-4 py-2">
                        ₹{entry.total.toLocaleString("en-IN")}
                    </td>
                </tr>);
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
                    ₹{calc?.totalGrossAmount.toLocaleString("en-IN")}
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
                    {calc.discount}%
                </td>
            </tr>
            <tr className="bg-[#CFE1B9]">
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Discount Amount
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{calc?.discountAmount.toLocaleString("en-IN")}
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
            <tr className="font-bold bg-[#CFE1B9]">
                <td
                    colSpan={6}
                    className="px-4 py-2 text-right border border-black"
                >
                    Total
                </td>
                <td className="border border-black px-4 py-2 text-center">
                    ₹{calc?.totalAmount.toLocaleString("en-IN")}
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
                    ₹{calc?.taxAmount.toLocaleString("en-IN")}
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
                    ₹{calc?.grandTotal.toLocaleString("en-IN")}
                </td>
            </tr>
        </tbody>
    </table>
    );

}




const freightCharges = 50000;

function QuotationTableHeader() {
    return (<thead className="bg-[darkorange]">
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
    )
}
export default CustomerFormQuotationTable;
const QUOTATION_TABLE_DATA = (item: TCustomerComponentDesign2DItem, discount: number) => {
    const rows = item.data?.flatMap(((row) => row?.entries?.flatMap((entry) => entry)))
    const designs = _.uniq(_.flatMap(rows, 'design'))?.sort()
    return ({
        original: item.data,
        calc: TO_TOTAL_GROSS_AMOUNT(item, discount),
        rows: designs?.flatMap((design) => {
            const collections = _.filter(rows, { design })
            const finishes = _.uniq(_.map(collections, 'finish'))?.sort();
            return finishes?.flatMap((finish) => {
                const original = _.filter(collections, { finish })
                const quantity = _.sum(original?.map((collect) => Number(collect.quantity || 0)))
                const price = _.get(CMS_QUOTATION_OPTIONS, `${design}.${finish}`, 0)
                const total = price * (quantity || 1);
                return ({
                    design,
                    area: _.fromStrToSentence(original?.map((item) => item.area)?.sort()),
                    floor: _.fromStrToSentence(original?.map((item) => item.floor)?.sort()),
                    finish,
                    quantity,
                    price,
                    total,
                })
            })
        })
    });

}


const TO_TOTAL_GROSS_AMOUNT = (item: TCustomerComponentDesign2DItem, discount: number) => {
    // Ensure the function processes all entries in the item
    let totalGrossAmount = 0;

    if (item && Array.isArray(item.data) && item.data.length > 0) {
        totalGrossAmount = item.data?.flatMap((x) => x.entries || []).reduce((acc, entry) => {
            const price = _.get(CMS_QUOTATION_OPTIONS, `${entry.design}.${entry.finish}`, 0);
            const total = price * (entry.quantity || 1); // Calculate total for the entry
            return acc + total; // Add to accumulator
        }, 0);
    }
    // return totalGrossAmount; // Return the gross total



    const discountAmount =
        totalGrossAmount * (discount / 100);
    const totalAmount =
        totalGrossAmount - discountAmount + freightCharges;
    const taxAmount = totalAmount * (18 / 100);
    const grandTotal = totalAmount + taxAmount;

    return ({
        taxAmount,
        discount,
        totalGrossAmount,
        discountAmount,
        totalAmount,
        grandTotal

    })
}
type TProps = {
    quotation: TCustomerComponentQuotationItem
    item: TCustomerComponentDesign2DItem
}
