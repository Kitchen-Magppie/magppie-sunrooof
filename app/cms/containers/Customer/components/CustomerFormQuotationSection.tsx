import { useFormContext } from 'react-hook-form'
import { useCallback, useRef, useState } from 'react'
// import { IoIosRemoveCircleOutline } from "react-icons/io";
import html2canvas from 'html2canvas'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import jsPDF from 'jspdf'
import { FaRegFilePdf } from 'react-icons/fa'
import { toast } from 'react-toastify'
//====================================================================

import {
    _,
    CustomerComponentEnum,
    // TCustomerComponentItem,
    TCustomerComponentQuotationItem,
    TCustomerItem,
} from '../../../../../types'
import {
    // FieldCautation,
    MinimalAccordion,
    MinimalDropdown,
} from '../../../components'
import {
    // CMS_QUOTATION_FLOOR_OPTIONS,
    // CMS_QUOTATION_OPTIONS,
    // INIT_COMPONENT_QUOTATION_ENTRY_ITEM,
    QUOTATION_SALUTATION_OPTIONS,
} from '../../../mocks'
import { useFirebaseStorageActions } from '../../../../../hooks'
// import { ImageInput } from "../../../../../components";
import { paymentTermsData } from '../../../../QuotationGenerator/components/paymentTermsData'
import QR_ILLUSTRATION from '../../../../QuotationGenerator/assets/qr.png'
import COMPANY_LOGO from '../../../../QuotationGenerator/assets/logo_black.png'
import CustomerFormQuotationTable from '../CustomerDashboard/CustomerFormQuotationTable'

function CustomerFormQuotationSection(props: TProps) {
    const { title, i, data } = props
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const StorageActions = useFirebaseStorageActions()
    const [freightCharges, setFreightCharges] = useState(0); // Initialize with a default value

    // Handle change event to update the state
    const handleFreightChargesChange = (e) => {
        setFreightCharges(Number(e.target.value));
    };
    const {
        watch,
        register,
        formState: { errors },
        setValue,
    } = useFormContext<TCustomerItem>()
    const values = watch() as TCustomerItem
    // console.log(values)

    const invoiceRef = useRef(null)
    const invoiceRefPng = useRef(null)
    const downloadInvoice = useCallback(() => {
        const invoiceElement = invoiceRef.current

        html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png') // Convert canvas to PNG

            const pdf = new jsPDF('p', 'mm', 'a4') // A4 PDF in portrait mode
            const imgWidth = 210 // A4 width in mm
            const pageHeight = 295 // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width // Calculate image height based on aspect ratio
            let heightLeft = imgHeight
            let position = 0

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight

            // Add more pages if necessary
            while (heightLeft > 0) {
                position = heightLeft - imgHeight // Move to next page position
                pdf.addPage() // Add new page
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight) // Add the image at the correct position
                heightLeft -= pageHeight // Reduce the height left to render
            }
            const fileName = `invoice-${+new Date()}.pdf`
            pdf.save(fileName) // Save the generated PDF
        })
    }, [])

    // const TO_TOTAL_GROSS_AMOUNT = useCallback((arr: TCustomerComponentItem[]) => {
    //     const twoDataItem = arr.find(
    //         (item) => item.value === CustomerComponentEnum.TwoDDesign
    //     );
    //     // Step 1: Calculate Total Gross Amount Directly
    //     let totalGrossAmount = 0;

    //     if (twoDataItem && Array.isArray(twoDataItem.data) && twoDataItem.data.length > 0) {
    //         totalGrossAmount = twoDataItem.data?.flatMap((item) => item.entries || []).reduce((acc, entry) => {
    //             console.log(entry)

    //             const price = _.get(CMS_QUOTATION_OPTIONS, `${entry.design}.${entry.finish}`, 0)
    //             const total = price * (entry.quantity || 1);
    //             return acc + total;
    //         }, 0);
    //     }
    //     return totalGrossAmount
    // }, [])
    const onClickGenerateSaveInvoiceImage = useCallback(
        (i: number) => {
            const invoiceElement = invoiceRefPng.current
            setCorpus((prev) => ({ ...prev, isQuotationImageDownload: true }))
            html2canvas(invoiceElement)
                .then((canvas) => {
                    // FIXME: Maye be we remove the download feature from here;
                    const link = document.createElement('a')
                    const dataUrl = canvas.toDataURL('image/png')
                    link.href = dataUrl
                    link.download = `invoice-${+new Date()}.png`
                    const blob = _.dataURLtoBlob(dataUrl)
                    const file = new File([blob], link.download, {
                        type: 'image/png',
                    })
                    StorageActions.upload({
                        file,
                        path: `customers/${values.customerId}/${CustomerComponentEnum.Quotation}`,

                        onSuccess(e) {
                            console.log(e)
                            setValue(`components.${i}.data.invoiceUrl`, e.link)
                            toast(
                                'Image url has been generated. Press submit this to save the changes.'
                            )
                        },
                    })
                    link.click()
                })
                .finally(() => {
                    setCorpus((prev) => ({
                        ...prev,
                        isQuotationImageDownload: false,
                    }))
                })
        },
        [StorageActions, setValue, values?.customerId]
    )

    const renderErrorMessage = useCallback(
        (field: string) => {
            if (_.get(errors, field)) {
                return (
                    <p className="text-red-500 text-xs mt-1">
                        {_.get(errors, `${field}.message`)}
                    </p>
                )
            }
            return <></>
        },
        [errors]
    )
    // const totalGrossAmount = useMemo(() => TO_TOTAL_GROSS_AMOUNT(values.components), [TO_TOTAL_GROSS_AMOUNT, values.components]);
    const twoDataItem = values.components.find(
        (item) => item.value === CustomerComponentEnum.TwoDDesign
    )
    // const discountAmount = totalGrossAmount * (data.data.discount / 100);
    // const totalAmount =
    // totalGrossAmount - discountAmount + freightCharges;
    // const taxAmount = totalAmount * (18 / 100);
    // const grandTotal = totalAmount + taxAmount;
    // const entries = data?.data?.entries?.length
    //     ? data?.data?.entries
    //     : [];
    // const hasMoreThenOne = entries?.length > 1;
    console.log(twoDataItem)

    // console.log(item);

    const totalQuantity = twoDataItem?.data?.reduce((total, item) => {
        return total + item?.entries?.reduce((subTotal, entry) => subTotal + (Number(entry.quantity) || 0), 0);
    }, 0);

    console.log(totalQuantity);

    return (
        <MinimalAccordion isExpanded title={title}>
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Salutation
                        </label>
                        <MinimalDropdown
                            defaultValue={salutations?.find(
                                (salutation) =>
                                    salutation.value === data.data.salutation
                            )}
                            options={salutations}
                            onChange={(e) => {
                                console.log(e)
                                setValue(
                                    `components.${i}.data.salutation`,
                                    e.value
                                )
                            }}
                        />
                        {renderErrorMessage(`components.${i}.data.salutation`)}
                    </div>
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={values.name}
                            onChange={(e) => {
                                setValue('name', e.target.value)
                            }}
                            // {...register(`components.${i}.data.name`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`name`)}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            {...register(`components.${i}.data.email`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${i}.data.email`)}
                    </div>
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Mobile
                        </label>
                        <input
                            type="text"
                            {...register(`components.${i}.data.mobile`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${i}.data.mobile`)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Created Date
                        </label>
                        <input
                            type="date"
                            {...register(`components.${i}.data.createdDate`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                            placeholder="Created Date"
                        />
                        {renderErrorMessage(`components.${i}.data.createdDate`)}
                    </div>
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            {...register(`components.${i}.data.address`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${i}.data.address`)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            {...register(`components.${i}.data.city`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${i}.data.city`)}
                    </div>

                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Zone
                        </label>
                        <select
                            defaultValue=""
                            {...register(`components.${i}.data.zone`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select a zone</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="North India">North India</option>
                            <option value="Central India">Central India</option>
                            <option value="East India">East India</option>
                            <option value="West India">West India</option>
                            <option value="South India">South India</option>
                            <option value="North-East India">North-East India</option>
                        </select>
                        {renderErrorMessage(`components.${i}.data.zone`)}
                    </div>

                    {/* <div className="bg-white">
                    <label className="block text-sm font-medium text-gray-700">
                        Zone
                    </label>
                    <input
                        type="text"
                        {...register(`components.${i}.data.zone`)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {renderErrorMessage(`components.${i}.data.zone`)}
                </div> */}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                            Discount %
                        </label>
                        <input
                            type="number"
                            {...register(`components.${i}.data.discount`)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {renderErrorMessage(`components.${i}.data.discount`)}
                    </div>
                    {totalQuantity > 80 ? (
                        <div className="bg-white">
                            <label className="block text-sm font-medium text-gray-700">
                                Custom Freight Charges
                            </label>
                            <input
                                type="number"
                                value={freightCharges}
                                onChange={handleFreightChargesChange}
                                // {...register(`components.${i}.data.fCharges`)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {/* {renderErrorMessage(`components.${i}.data.fCharges`)} */}
                        </div>
                    ) : null}
                </div>

                <div className="border rounded-lg p-3">
                    {/* <FieldCautation
                    label="Entries"
                    onClickAdd={() => {
                        setValue(`components.${i}.data.entries`, [
                            ...entries,
                            INIT_COMPONENT_QUOTATION_ENTRY_ITEM,
                        ]);
                    }}
                /> */}
                    {/* {renderErrorMessage(`components.${i}.data.entries`)} */}
                    {/* <div id="entries" className="w-full">
                    {entries?.map((entry, index) => {
                        return (
                            <div key={i}>
                                <div className="text-gray-400 italic text-lg flex justify-between">
                                    #{index + 1}
                                    <div className="py-1">
                                        <IoIosRemoveCircleOutline
                                            className={
                                                hasMoreThenOne
                                                    ? "text-red-500 cursor-pointer hover:text-red-800"
                                                    : ""
                                            }
                                            onClick={() => {
                                                setValue(
                                                    `components.${i}.data.entries`,
                                                    data.data?.entries?.filter(
                                                        (_, entryIndex) =>
                                                            entryIndex !== index
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 ">
                                    <div className="bg-white ">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Design
                                        </label>

                                        <select
                                            value={entry.design}
                                            {...register(
                                                `components.${i}.data.entries.${index}.design`
                                            )}
                                            className="bg-gray-50 border w-full mr-2 mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                                        >
                                            <option value="">Select Design</option>
                                            {Object.keys(CMS_QUOTATION_OPTIONS).map(
                                                (value, i) => (
                                                    <option key={i} value={value}>
                                                        {value}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        {renderErrorMessage(
                                            `components.${i}.data.entries.${index}.design`
                                        )}
                                    </div>
                                    <div className="bg-white">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Finish
                                        </label>

                                        <select
                                            value={entry.finish}
                                            {...register(
                                                `components.${i}.data.entries.${index}.finish`
                                            )}
                                            className="bg-gray-50 border mr-2 mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                                        >
                                            <option value="">Select Finish</option>
                                            {entry.design &&
                                                Object.keys(
                                                    CMS_QUOTATION_OPTIONS[entry.design] ||
                                                    {}
                                                ).map((finishOption) => (
                                                    <option
                                                        key={finishOption}
                                                        value={finishOption}
                                                    >
                                                        {finishOption}
                                                    </option>
                                                ))}
                                        </select>
                                        {renderErrorMessage(
                                            `components.${i}.data.entries.${index}.finish`
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 ">
                                    <div className="bg-white ">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Area
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Area"
                                            value={entry.area}
                                            {...register(
                                                `components.${i}.data.entries.${index}.area`
                                            )}
                                            // onChange={(e) => handleChangeEntry(index, 'area', e.target.value)}
                                            className="bg-gray-50 border mr-2 mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                                        />
                                        {renderErrorMessage(
                                            `components.${i}.data.entries.${index}.area`
                                        )}
                                    </div>
                                    <div className="bg-white">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Floor
                                        </label>
                                        <select
                                            value={entry.floor}
                                            {...register(
                                                `components.${i}.data.entries.${index}.floor`
                                            )}
                                            className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                                        >
                                            <option value="">Select Floor</option>
                                            {CMS_QUOTATION_FLOOR_OPTIONS.map(
                                                (floor) => (
                                                    <option key={floor} value={floor}>
                                                        {floor}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {renderErrorMessage(
                                            `components.${i}.data.entries.${index}.floor`
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 ">
                                    <div className="bg-white ">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            value={entry.qty}
                                            {...register(
                                                `components.${i}.data.entries.${index}.qty`
                                            )}
                                            // onChange={(e) => handleChangeEntry(index, 'qty', e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                                        />
                                        {renderErrorMessage(
                                            `components.${i}.data.entries.${index}.qty`
                                        )}
                                    </div>
                                    <div />
                                </div>
                            </div>
                        );
                    })}
                </div> */}
                    <div className="flex gap-2 mt-2 flex-row-r,everse">
                        <button
                            disabled={corpus.isQuotationImageDownload}
                            type="button"
                            onClick={() => onClickGenerateSaveInvoiceImage(i)}
                            className=" flex justify-center gap-3 flex-row align-middle p-2  border border-transparent text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <MdOutlineCloudUpload className="text-xl" />
                            Generate Design
                            {corpus.isQuotationImageDownload ? (
                                <AiOutlineLoading3Quarters className="text-xl animate-spin" />
                            ) : (
                                ''
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={downloadInvoice}
                            className=" flex justify-center gap-3 flex-row align-middle p-2  border border-transparent text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FaRegFilePdf className="text-lg" />
                            PDF
                        </button>
                        {/* <IoMdCloudDownload
                            onClick={
                                downloadInvoice
                            }
                            className="h-6 w-6 ml-2 cursor-pointer"
                        /> */}
                    </div>
                    <div className=" py-10  w-full" ref={invoiceRefPng}>
                        <div className="w-full">
                            <CustomerFormQuotationTable
                                fCharges={freightCharges}
                                item={twoDataItem}
                                quotation={data}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="container mx-auto max-w-7xl py-10 px-5 absolute top-[-1000px] left-[-2000px]"
                    ref={invoiceRef}
                >
                    <div className="flex justify-between">
                        <div>
                            <img
                                src={COMPANY_LOGO}
                                className="w-[220px] mb-5"
                                alt="Logo"
                            />
                            <p className="text-lg mb-5">
                                Sunrooof Luminaries Pvt Ltd.
                            </p>
                            <p className="text-lg mb-5">
                                Plot No 3, Sector 8, IMT Manesar,
                            </p>
                            <p className="text-lg mb-5">
                                Gurgaon, Haryana - 122052
                            </p>
                        </div>
                        <div>
                            <img
                                src={QR_ILLUSTRATION}
                                alt="QR Code"
                                className="w-[150px]"
                            />
                            <a
                                href="https://www.sunrooof.com"
                                className="text-lg mb-5"
                            >
                                www.sunrooof.com
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold mb-4">Quotation</h3>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Client: </span>
                            {values.name}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Phone:</span>{' '}
                            {data.data.mobile}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Email:</span>{' '}
                            {data.data.email}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Site Address:</span>{' '}
                            {data.data.address}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Zone:</span>{' '}
                            {data.data.zone}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Date:</span>{' '}
                            {data.data.createdDate}
                        </p>
                        <CustomerFormQuotationTable
                            fCharges={freightCharges}
                            item={twoDataItem}
                            quotation={data}
                        />
                        {/* <table className="container mx-auto max-w-7xl border border-black"> */}
                        {/* <thead className="bg-[darkorange]">
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
                        </thead> */}
                        {/* <tbody> */}
                        {/* {twoDataItem.data?.flatMap((item) => item.entries || []).map((entry, index) => {
                                const price = _.get(CMS_QUOTATION_OPTIONS, `${entry.design}.${entry.finish}`, 0)

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
                                            {entry.area}
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
                            })} */}
                        {/* After all entries, render the totals */}
                        {/* <tr className="font-bold">
                                <td
                                    colSpan={6}
                                    className="px-4 py-2 text-right border border-black"
                                >
                                    Gross Amount
                                </td>
                                <td className="border border-black px-4 py-2 text-center">
                                    ₹{totalGrossAmount.toLocaleString("en-IN")}
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
                                    ₹{discountAmount.toLocaleString()}
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
                                    ₹{totalAmount.toLocaleString("en-IN")}
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
                                    ₹{taxAmount.toLocaleString()}
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
                                    ₹{grandTotal.toLocaleString("en-IN")}
                                </td>
                            </tr> */}
                        {/* </tbody> */}
                        {/* </table> */}

                        <div className="mt-80">
                            <h1 className="text-2xl font-bold mb-2">
                                Payment Terms
                            </h1>
                            {paymentTermsData.map((data, i) => {
                                return (
                                    <div
                                        className="text-lg mb-2 list-decimal"
                                        key={i}
                                    >
                                        <div className="flex items-start">
                                            <span className="mr-2">
                                                {data.id}.
                                            </span>
                                            <p>{data.content}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {renderErrorMessage(`components.${i}.data.invoiceUrl`)}
                {/* <div className="grid grid-cols-2 gap-2">
                <ImageInput
                    label="Invoice URL"
                    values={
                        data.data.invoiceUrl?.length
                            ? [data.data.invoiceUrl]
                            : []
                    }
                    path={`customers/${values.customerId}/${CustomerComponentEnum.Quotation}`}
                    onSuccess={(e) => {
                        setValue(
                            `components.${i}.data.invoiceUrl`,
                            e[0]
                        );
                    }}
                />
                {renderErrorMessage(
                    `components.${i}.data.invoiceUrl`
                )}
            </div> */}
            </div>
        </MinimalAccordion>
    )
}

const salutations = _.labelify(QUOTATION_SALUTATION_OPTIONS)

const INIT_CORPUS = {
    isSubmitting: false,
    isQuotationImageDownload: false,
}

// const freightCharges = 50000;

type TProps = {
    title: string
    i: number
    data: TCustomerComponentQuotationItem
}
export default CustomerFormQuotationSection
