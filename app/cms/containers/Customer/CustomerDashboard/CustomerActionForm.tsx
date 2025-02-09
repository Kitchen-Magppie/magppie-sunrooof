import { useCallback, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLocation } from "react-use";

//====================================================================

import {
    _,
    ComponentModeEnum,
    CustomerComponentEnum,
    IS_VALID_FOR_URL,
    TCustomerComponentDesign2DItem,
    TCustomerComponentFeatureItem,
    TCustomerComponentQuotationItem,
    TCustomerItem,
    validateCustomerItemSchema,
} from "../../../../../types";
import {

    CUSTOMER_COMPONENT_COMPARISON_OPTIONS,
    CUSTOMER_COMPONENT_FEATURE_OPTIONS,
    CUSTOMER_COMPONENT_VALUE_OPTIONS,
    DEFAULT_CUSTOMER,
} from "../../../mocks";
import {
    CmsCopyClipboard,
    FieldCautation,
    MinimalAccordion,
    MinimalDropdown,
} from "../../../components";
import { ImageInput } from "../../../../../components";
import { useFirebaseCustomerAction } from "../../../utils";
import CustomerFormQuotationSection from "../components/CustomerFormQuotationSection";
import { CMS_TOAST_CONFIG } from "../../../types";
import { CustomerFormTwoDDesignSection } from "../components";

export function CustomerActionForm(props: TProps) {
    const [corpus, setCorpus] = useState(INIT_CORPUS);
    const { mode, item } = props;
    const isCreateAction = mode === ComponentModeEnum.Create;

    const location = useLocation();

    const publishedUrl = useMemo(() => {
        if (item.id?.length && IS_VALID_FOR_URL(item))
            return [location.origin, "quotation", item.id].join("/");
        return "";
    }, [item, location.origin]);

    const methods = useForm({
        resolver: yupResolver(validateCustomerItemSchema),
        defaultValues: {
            ...item,
            customerId: isCreateAction ? _.uuid() : item.customerId,
        },
    });

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;
    const values = watch() as TCustomerItem;
    // console.log(values)
    console.log(errors)
    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return (<p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>);
        }
        return <></>;
    }, [errors]);


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
                    toast.success("Record has been created", CMS_TOAST_CONFIG);
                } else {
                    action.edit({
                        ...data,
                        at: { ...data.at, updated: new Date() },
                    });
                    toast.success("Record has been edited", CMS_TOAST_CONFIG);
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

    return (<FormProvider {...methods}>
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
                                            <MinimalDropdown
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
                                        <MinimalDropdown
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
                            const data = component as TCustomerComponentQuotationItem;
                            return (<div key={i}>
                                <CustomerFormQuotationSection data={data} title={title} i={i} />
                            </div>);
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
                                <CustomerFormTwoDDesignSection
                                    index={i}
                                    title={title}
                                    item={prev}
                                    isCreateAction={isCreateAction}
                                />
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
    </FormProvider>);
}

type TProps = {
    mode: ComponentModeEnum;
    item: TCustomerItem;
    onSubmit: VoidFunction;
};
// 631

const INIT_CORPUS = {
    isSubmitting: false,



};

//1330
