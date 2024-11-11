import { useCallback, useMemo, useState, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { toast, ToastOptions } from "react-toastify";
import { Link } from "react-router-dom";
import { useLocation } from "react-use";
import Select from "react-select";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
// import { IoMdCloudDownload } from 'react-icons/io'

//====================================================================

import logoBlack from "../../../../QuotationGenerator/assets/logo_black.png";
import qr from "../../../../QuotationGenerator/assets/qr.png";
import { paymentTermsData } from "../../../../QuotationGenerator/components/paymentTermsData";
import {
    _,
    ComponentModeEnum,
    CustomerComponentEnum,
    IProposedLayoutItem,
    // TCustomerComponentComparisonItem,
    TCustomerComponentDesign2DItem,
    TCustomerComponentFeatureItem,
    TCustomerComponentItem,
    TCustomerComponentQuotationItem,
    TCustomerItem,
    validateCustomerItemSchema,
} from "../../../../../types";
import {
    CMS_QUOTATION_FLOOR_OPTIONS,
    CMS_QUOTATION_OPTIONS,
    COMPONENT_DESIGN2D_DESIGN_OPTIONS,
    COMPONENT_DESIGN2D_FINISH_OPTIONS,
    CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS,
    CUSTOMER_COMPONENT_COMPARISON_OPTIONS,
    CUSTOMER_COMPONENT_FEATURE_OPTIONS,
    CUSTOMER_COMPONENT_VALUE_OPTIONS,
    DEFAULT_CUSTOMER,
    INIT_COMPONENT_QUOTATION_ENTRY_ITEM,
    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
    QUOTATION_SALUTATION_OPTIONS,
} from "../../../mocks";
import {
    CmsCopyClipboard,
    FieldCautation,
    MinimalAccordion,
} from "../../../components";
import { ImageInput } from "../../../../../components";
import { useFirebaseCustomerAction } from "../../../utils/firebase/customer";
import { useFirebaseStorageActions } from "../../../../../hooks/firebase";
import { useAppSelector } from "../../../../../redux";

export function CustomerActionForm(props: TProps) {
    const invoiceRef = useRef(null);
    const invoiceRefPng = useRef(null);
    const StorageActions = useFirebaseStorageActions();
    const [corpus, setCorpus] = useState(INIT_CORPUS);
    const { mode, item } = props;

    const isCreateAction = mode === ComponentModeEnum.Create;

    const location = useLocation();
    const proposedLayout = useAppSelector((state) => state.Cms.ProposedLayout.value);
    // console.log(proposedLayout)

    const downloadInvoice = useCallback(() => {
        const invoiceElement = invoiceRef.current;

        html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png"); // Convert canvas to PNG

            const pdf = new jsPDF("p", "mm", "a4"); // A4 PDF in portrait mode
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height based on aspect ratio
            let heightLeft = imgHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add more pages if necessary
            while (heightLeft > 0) {
                position = heightLeft - imgHeight; // Move to next page position
                pdf.addPage(); // Add new page
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight); // Add the image at the correct position
                heightLeft -= pageHeight; // Reduce the height left to render
            }
            const fileName = `invoice-${+new Date()}.pdf`;
            pdf.save(fileName); // Save the generated PDF
        });
    }, []);

    const publishedUrl = useMemo(() => {
        if (item.id?.length)
            return [location.origin, "quotation", item.id].join("/");
        return "";
    }, [item.id, location.origin]);

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateCustomerItemSchema),
        defaultValues: {
            ...item,
            customerId: isCreateAction ? _.uuid() : item.customerId,
        },
    });

    const values = watch();

    const onClickGenerateSaveInvoiceImage = useCallback(
        (i: number) => {
            const invoiceElement = invoiceRefPng.current;
            setCorpus((prev) => ({ ...prev, isQuotationImageDownload: true }));
            html2canvas(invoiceElement)
                .then((canvas) => {
                    // FIXME: Maye be we remove the download feature from here;
                    const link = document.createElement("a");
                    const dataUrl = canvas.toDataURL("image/png");
                    link.href = dataUrl;
                    link.download = `invoice-${+new Date()}.png`;
                    const blob = _.dataURLtoBlob(dataUrl);
                    const file = new File([blob], link.download, { type: "image/png" });
                    StorageActions.upload({
                        file,
                        path: `customers/${values.customerId}/${CustomerComponentEnum.Quotation}`,
                        onSuccess(e) {
                            setValue(`components.${i}.data.invoiceUrl`, e.link);
                        },
                    });
                    link.click();
                })
                .finally(() => {
                    setCorpus((prev) => ({ ...prev, isQuotationImageDownload: false }));
                });
        },
        [StorageActions, setValue, values?.customerId]
    );

    console.log(values)
    // const totalGrossAmount = useMemo(() => {
        // const twoDataItem = (values.components as TCustomerComponentItem[]).find(
        //     (item) => item.value === CustomerComponentEnum.TwoDDesign
        // );
        // const twoDataItem = (values.components as TCustomerComponentItem[]).find((item) => item.value === CustomerComponentEnum.TwoDDesign);
        // const quotation = (
        //     values?.components as TCustomerComponentQuotationItem[]
        // )?.find((item) => item.value === CustomerComponentEnum.Quotation);
        // if (quotation?.data?.entries?.length) {
        //     return quotation.data.entries.reduce((acc, entry) => {
        //         const price = CMS_QUOTATION_OPTIONS[entry.design]?.[entry.finish] || 0;
        //         const total = price * (entry.qty || 1);
        //         return acc + total;
        //     }, 0);
        // }
        // if (twoDataItem?.data?.length) {
        //     return twoDataItem.data.reduce((acc, entry) => {
        //         const price = CMS_QUOTATION_OPTIONS[entry.design]?.[entry.finish] || 0;
        //         const total = price * (entry.quantity || 1);
        //         return acc + total;
        //     }, 0);
        // }
        // return 0;
    // }, [values?.components]);

    const twoDataItem = (values.components as TCustomerComponentItem[]).find(
        (item) => item.value === CustomerComponentEnum.TwoDDesign
    );
    
    // Step 1: Calculate Total Gross Amount Directly
    let totalGrossAmount = 0;
    
    if (twoDataItem && Array.isArray(twoDataItem.data) && twoDataItem.data.length > 0) {
        totalGrossAmount = twoDataItem.data.reduce((acc, entry) => {
            const price = CMS_QUOTATION_OPTIONS[entry.design]?.[entry.finish] || 0;
            const total = price * (entry.quantity || 1);
    
            // Log each entry’s calculation for verification
            console.log(`Design: ${entry.design}, Finish: ${entry.finish}, Quantity: ${entry.quantity}, Price: ${price}, Total: ${total}`);
            
            return acc + total;
        }, 0);
    }

    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return (<p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>);
        }
        return <></>;
    },
        [errors]
    );

    const action = useFirebaseCustomerAction();

    const onSubmit = handleSubmit((data: TCustomerItem) => {
        setCorpus((prev) => ({ ...prev, isSubmitting: true }));
        setTimeout(() => {
            if (DEFAULT_CUSTOMER.customerId !== item.customerId) {
                if (isCreateAction) {
                    action.add({
                        ...data,
                        at: { ...data.at, created: new Date() },
                    });
                    toast.success("Record has been created", TOAST_OPTIONS);
                } else {
                    action.edit({
                        ...data,
                        at: { ...data.at, updated: new Date() },
                    });
                    toast.success("Record has been edited", TOAST_OPTIONS);
                }
            }
            setCorpus((prev) => ({ ...prev, isSubmitting: false }));
            props.onSubmit();
        }, 2000);
    });
    const renderPublishUrlContent = useMemo(() => {
        return publishedUrl?.length ? (
            <div className="flex flex-row gap-2 justify-between my-2 ">
                <div className="flex gap-1 align-middle justify-center">
                    <button
                        type="button"
                        disabled
                        className=" flex justify-center gap-3 flex-row align-middle w-full p-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <IoIosLink className="my-1" />
                        Generated Link
                    </button>
                    <Link
                        target="_blank"
                        to={publishedUrl}
                        className="text-blue-600 underline flex justify-center align-middle flex-col"
                    >
                        {publishedUrl}
                    </Link>
                </div>
                <CmsCopyClipboard text={publishedUrl} />
            </div>
        ) : (
            <div className="mb-2">
                <FieldCautation
                    disableAppendButton
                    label="NOTE"
                    remark="Once all fields are valid, the URL will be generated automatically upon saving the form."
                />
            </div>
        );
    }, [publishedUrl]);

    return (
        <form onSubmit={onSubmit} className=" h-[85vh] overflow-y-scroll ">
            <div className="flex flex-col gap-2">
                <div className="bg-white px-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {renderErrorMessage("name")}
                </div>
                <div className="px-6"></div>
            </div>

            {/* Components (rendering depends on the type of component) */}
            <div className="px-6">
                {values?.components?.map((component, i) => {
                    const value = _.get(component, "value");
                    const title = CUSTOMER_COMPONENT_VALUE_OPTIONS?.find(
                        (item) => item.value === value
                    ).label;
                    switch (value) {
                        case CustomerComponentEnum.Feature: {
                            const data = component as TCustomerComponentFeatureItem;
                            return (
                                <div key={i}>
                                    <MinimalAccordion isExpanded title={title}>
                                        <div className="d-flex flex-row gap">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 6,
                                                    colors: {
                                                        ...theme.colors,
                                                        text: "white",
                                                        primary25: "#3F51B5",
                                                        primary: "#3F51B5",
                                                    },
                                                })}
                                                classNames={{
                                                    control: () => AUTOCOMPLETE_STYLE,
                                                }}
                                                onChange={(e) => {
                                                    setValue(`components.${i}.data`, e.value);
                                                }}
                                                defaultValue={CUSTOMER_COMPONENT_FEATURE_OPTIONS?.find(
                                                    ({ value }) => value === data.data
                                                )}
                                                options={CUSTOMER_COMPONENT_FEATURE_OPTIONS}
                                            />
                                            {renderErrorMessage(`components.${i}.data`)}
                                        </div>
                                    </MinimalAccordion>
                                </div>
                            );
                        }
                        case CustomerComponentEnum.Comparison: {
                            return (
                                <div key={i}>
                                    <MinimalAccordion isExpanded title={title}>
                                        <Select
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 6,
                                                colors: {
                                                    ...theme.colors,
                                                    text: "white",
                                                    primary25: "#3F51B5",
                                                    primary: "#3F51B5",
                                                },
                                            })}
                                            classNames={{
                                                control: () => AUTOCOMPLETE_STYLE,
                                            }}
                                            defaultValue={CUSTOMER_COMPONENT_COMPARISON_OPTIONS?.find(
                                                (item) => item.value === _.get(component, "data")
                                            )}
                                            onChange={(e) => {
                                                setValue(`components.${i}.data`, e.value);
                                            }}
                                            options={CUSTOMER_COMPONENT_COMPARISON_OPTIONS}
                                        />
                                        {renderErrorMessage(`components.${i}.data`)}
                                    </MinimalAccordion>
                                </div>
                            );
                        }
                        case CustomerComponentEnum.Quotation: {
                            const salutations = _.labelify(QUOTATION_SALUTATION_OPTIONS);
                            const data = component as TCustomerComponentQuotationItem;

                            const twoDataItem = (values.components as TCustomerComponentItem[]).find((item) => item.value === CustomerComponentEnum.TwoDDesign);
                            const discountAmount =
                                totalGrossAmount * (data.data.discount / 100);
                            const freightCharges = 50000;
                            const totalAmount =
                                totalGrossAmount - discountAmount + freightCharges;
                            const taxAmount = totalAmount * (18 / 100);
                            const grandTotal = totalAmount + taxAmount;
                            const entries = data?.data?.entries?.length
                                ? data?.data?.entries
                                : [];
                            const hasMoreThenOne = entries?.length > 1;
                            console.log(twoDataItem);
                            

                            return (
                                <div key={i}>
                                    <MinimalAccordion isExpanded title={title}>
                                        <div className="flex flex-col gap-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-white">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Salutation
                                                    </label>
                                                    <Select
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            borderRadius: 6,
                                                            colors: {
                                                                ...theme.colors,
                                                                text: "white",
                                                                primary25: "#3F51B5",
                                                                primary: "#3F51B5",
                                                            },
                                                        })}
                                                        classNames={{
                                                            control: () => AUTOCOMPLETE_STYLE,
                                                        }}
                                                        defaultValue={salutations?.find(
                                                            (salutation) =>
                                                                salutation.value === data.data.salutation
                                                        )}
                                                        options={salutations}
                                                        onChange={(e) => {
                                                            setValue(
                                                                `components.${i}.data.salutation`,
                                                                e.value
                                                            );
                                                        }}
                                                    />
                                                    {renderErrorMessage(
                                                        `components.${i}.data.salutation`
                                                    )}
                                                </div>
                                                <div className="bg-white">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={values.name}
                                                        onChange={(e) => {
                                                            setValue("name", e.target.value);
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
                                                    {renderErrorMessage(
                                                        `components.${i}.data.createdDate`
                                                    )}
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
                                                    <input
                                                        type="text"
                                                        {...register(`components.${i}.data.zone`)}
                                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                    {renderErrorMessage(`components.${i}.data.zone`)}
                                                </div>
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
                                            </div>

                                            <div className="border rounded-lg p-3">
                                                <FieldCautation
                                                    label="Entries"
                                                    onClickAdd={() => {
                                                        setValue(`components.${i}.data.entries`, [
                                                            ...entries,
                                                            INIT_COMPONENT_QUOTATION_ENTRY_ITEM,
                                                        ]);
                                                    }}
                                                />
                                                {renderErrorMessage(`components.${i}.data.entries`)}
                                                <div id="entries" className="w-full">
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
                                                                            // onChange={(e) => handleChangeEntry(index, 'design', e.target.value)}
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
                                                                            // onChange={(e) => handleChangeEntry(index, 'finish', e.target.value)}
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
                                                                            // onChange={(e) => handleChangeEntry(index, 'floor', e.target.value)}
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
                                                </div>
                                                <div className="flex gap-2 mt-2 flex-row-reverse">
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
                                                            ""
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
                                                <div
                                                    className=" py-10 px-5  w-full"
                                                    ref={invoiceRefPng}
                                                >
                                                    <div className="w-full">
                                                        <table style={{ width: "100%" }}>
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
                                                                {twoDataItem.data.map((entry, index) => {
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
                                                                        ₹{discountAmount.toLocaleString("en-IN")}
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
                                                                        ₹{taxAmount.toLocaleString("en-IN")}
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
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
                                                            src={logoBlack}
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
                                                        <img src={qr} alt="QR Code" className="w-[150px]" />
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
                                                        <span className="font-bold">Phone:</span>{" "}
                                                        {data.data.mobile}
                                                    </p>
                                                    <p className="text-lg mb-5">
                                                        <span className="font-bold">Email:</span>{" "}
                                                        {data.data.email}
                                                    </p>
                                                    <p className="text-lg mb-5">
                                                        <span className="font-bold">Site Address:</span>{" "}
                                                        {data.data.address}
                                                    </p>
                                                    <p className="text-lg mb-5">
                                                        <span className="font-bold">Zone:</span>{" "}
                                                        {data.data.zone}
                                                    </p>
                                                    <p className="text-lg mb-5">
                                                        <span className="font-bold">Date:</span>{" "}
                                                        {data.data.createdDate}
                                                    </p>
                                                    <table className="container mx-auto max-w-7xl border border-black">
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
                                                            {twoDataItem.data.map((entry, index) => {
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
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div className="mt-20">
                                                        <h1 className="text-2xl font-bold mb-2">
                                                            Payment Terms
                                                        </h1>
                                                        {paymentTermsData.map((data) => {
                                                            return (
                                                                <div
                                                                    className="text-lg mb-2 list-decimal"
                                                                    key={data.id}
                                                                >
                                                                    <div className="flex items-start">
                                                                        <span className="mr-2">{data.id}.</span>
                                                                        <p>{data.content}</p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="">
                                                    <>
                                                        {/* <button>Upload Image</button> */}
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
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </MinimalAccordion>
                                </div>
                            );
                        }
                        case CustomerComponentEnum.ThreeDDesign: {
                            const items = _.get(component, "data", []) as string[];
                            return (
                                <div key={i}>
                                    <MinimalAccordion isExpanded title={title}>
                                        <ImageInput
                                            isMulti
                                            values={items}
                                            path={`customers/${values.customerId}/${CustomerComponentEnum.ThreeDDesign}`}
                                            onSuccess={(e) => {
                                                setValue(`components.${i}.data`, e);
                                            }}
                                        />
                                        {renderErrorMessage(`components.${i}.data`)}
                                    </MinimalAccordion>
                                </div>
                            );
                        }
                        case CustomerComponentEnum.TwoDDesign: {
                            const prev = component as TCustomerComponentDesign2DItem;
                            return (<div key={i}>
                                <MinimalAccordion isExpanded title={title}>
                                    <div >
                                        <FieldCautation
                                            onClickAdd={() => {
                                                setValue(`components.${i}.data`, [
                                                    ...prev.data,
                                                    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
                                                ]);
                                            }}
                                        />
                                        {prev.data?.map((data, k) => {
                                            const hasMoreThenOne = prev.data?.length > 1;
                                            return (
                                                <div
                                                    key={`${CustomerComponentEnum.TwoDDesign}-${i}-${k}`}
                                                    className="p-4 border shadow-sm rounded-lg  dark:border-gray-600 dark:bg-gray-800 my-3"
                                                >
                                                    <div className="text-gray-400 italic text-lg flex justify-between">
                                                        #{k + 1}
                                                        <div className="py-1">
                                                            <IoIosRemoveCircleOutline
                                                                className={
                                                                    hasMoreThenOne
                                                                        ? "text-red-500 cursor-pointer hover:text-red-800"
                                                                        : ""
                                                                }
                                                                onClick={() => {
                                                                    if (hasMoreThenOne)
                                                                        setValue(
                                                                            `components.${i}.data`,
                                                                            prev.data.filter((_, m) => m !== k)
                                                                        );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                                        {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.filter(
                                                            ({ field }) => field === "select"
                                                        )?.map((item, j) => {
                                                            const options = DESIGN_2D_SELECT_OPTION(
                                                                item.value,
                                                                proposedLayout
                                                            );

                                                            return (
                                                                <div
                                                                    className="bg-white"
                                                                    key={`${CustomerComponentEnum.TwoDDesign}-${i}-${k}-${j}`}
                                                                >
                                                                    <Select
                                                                        theme={(theme) => ({
                                                                            ...theme,
                                                                            borderRadius: 6,
                                                                            colors: {
                                                                                ...theme.colors,
                                                                                text: "white",
                                                                                primary25: "#3F51B5",
                                                                                primary: "#3F51B5",
                                                                            },
                                                                        })}
                                                                        classNames={{
                                                                            control: () => AUTOCOMPLETE_STYLE,
                                                                        }}
                                                                        placeholder={item.label}
                                                                        defaultValue={options?.find(
                                                                            (option) =>
                                                                                option.value === data[item.value]
                                                                        )}
                                                                        onChange={(e) => {
                                                                            if (item.value === 'rightImage') {

                                                                                const currentProposedLayout = proposedLayout?.find((currentItem) => currentItem.label === e.label)
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.rightImage`,
                                                                                    currentProposedLayout.url.proposed
                                                                                );
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.leftImage`,
                                                                                    currentProposedLayout.url.customer
                                                                                );
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.quantity`,
                                                                                    currentProposedLayout.sunrooofCount);
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.design`,
                                                                                    currentProposedLayout.design);
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.finish`,
                                                                                    currentProposedLayout.finish);

                                                                                setValue(
                                                                                    `name`,
                                                                                    currentProposedLayout.name
                                                                                );

                                                                            }
                                                                            else {
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.${item.value}`,
                                                                                    e?.value?.length ? e.value : ""
                                                                                );

                                                                            }

                                                                        }}
                                                                        options={options}
                                                                    />
                                                                    {renderErrorMessage(
                                                                        `components.${i}.data.${k}.${item.value}`
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                                        {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.filter(
                                                            ({ field }) => field === "text"
                                                        )?.map((item, j) => {
                                                            return (
                                                                <div
                                                                    className="bg-white"
                                                                    key={`${CustomerComponentEnum.TwoDDesign}-${i}-${k}-${j}`}
                                                                >
                                                                    <label className="block text-sm font-medium text-gray-700">
                                                                        {item.label}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        {...register(
                                                                            `components.${i}.data.${k}.${item.value}`
                                                                        )}
                                                                        placeholder={item.placeholder}
                                                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    />
                                                                    {renderErrorMessage(
                                                                        `components.${i}.data.${k}.${item.value}`
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.filter(
                                                            (item) => item.field === "image"
                                                        )?.map((item, j) => {
                                                            const value = data[item.value];
                                                            const items = (value as string)?.length ? [value] : [];
                                                            // console.log(items);
                                                            // console.log(item);
                                                            // console.log(value);

                                                            return (
                                                                <div key={j}>
                                                                    <ImageInput
                                                                        label={item.label}
                                                                        key={j}
                                                                        path={`/customers/${values.customerId}/${CustomerComponentEnum.TwoDDesign}`}
                                                                        values={items as string[]}
                                                                        onSuccess={(e) => {
                                                                            setValue(
                                                                                `components.${i}.data.${k}.${item.value}`,
                                                                                e[0]
                                                                            );
                                                                        }}
                                                                    />
                                                                    {renderErrorMessage(
                                                                        `components.${i}.data.${k}.${item.value}`
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </MinimalAccordion>
                            </div>
                            );
                        }
                        default:
                            return <div key={i} />;
                    }
                })}
                {errors.components && <p>{errors.components.message}</p>}

                {renderPublishUrlContent}
                <div className="mb-20" />
            </div>
            <div className="left-0 right-0 absolute bottom-5 px-10">
                <button
                    disabled={corpus.isSubmitting}
                    type="submit"
                    className=" flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isCreateAction ? "Create" : "Update"} Component
                    {corpus.isSubmitting ? (
                        <AiOutlineLoading3Quarters className="text-xl animate-spin" />
                    ) : (
                        <IoCreateOutline className="text-xl" />
                    )}
                </button>
            </div>
        </form>
    );
}

type TProps = {
    mode: ComponentModeEnum;
    item: TCustomerItem;
    onSubmit: VoidFunction;
};
// 631

const AUTOCOMPLETE_STYLE =
    "mt-1 block w-full py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
function DESIGN_2D_SELECT_OPTION(e: string, proposedLayout: IProposedLayoutItem[]) {
    switch (e) {
        case "design":
            return _.labelify(COMPONENT_DESIGN2D_DESIGN_OPTIONS);
        case "finish":
            return _.labelify(COMPONENT_DESIGN2D_FINISH_OPTIONS);
        case "rightImage":
            return proposedLayout?.map((item) => ({
                label: item.label,
                value: item.url.proposed,
            }));
        default:
            return [];
    }
}
const TOAST_OPTIONS: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    style: { background: "#222222" },
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

const INIT_CORPUS = {
    isSubmitting: false,
    isQuotationImageDownload: false,
};
//1330
