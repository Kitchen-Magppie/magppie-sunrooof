import { useCallback, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLocation } from "react-use";
import Select from "react-select";
import { IoIosRemoveCircleOutline } from "react-icons/io";
//====================================================================

import {
    _,
    ComponentModeEnum,
    CustomerComponentEnum,
    // TCustomerComponentComparisonItem,
    TCustomerComponentDesign2DItem,
    TCustomerComponentFeatureItem,
    TCustomerItem,
    validateCustomerItemSchema,
} from "../../../../../types";
import {
    COMPONENT_DESIGN2D_DESIGN_OPTIONS,
    COMPONENT_DESIGN2D_FINISH_OPTIONS,
    CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS,
    CUSTOMER_COMPONENT_COMPARISON_OPTIONS,
    CUSTOMER_COMPONENT_FEATURE_OPTIONS,
    CUSTOMER_COMPONENT_VALUE_OPTIONS,
    DEFAULT_CUSTOMER,
    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
} from "../../../mocks";
import {
    CmsCopyClipboard,
    FieldCautation,
    MinimalAccordion,
} from "../../../components";
import { ImageInput } from "../../../../../components";
import { useFirebaseCustomerAction } from "../../../utils/firebase/customer";

export function CustomerActionForm(props: TProps) {
    const [corpus, setCorpus] = useState({ isSubmitting: false });
    const { mode, item } = props;

    const isCreateAction = mode === ComponentModeEnum.Create;

    const location = useLocation();

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

    const renderErrorMessage = useCallback(
        (field: string) => {
            if (_.get(errors, field)) {
                return (
                    <p className="text-red-500 text-xs mt-1">
                        {_.get(errors, `${field}.message`)}
                    </p>
                );
            }
            return "";
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
                    toast("Record has been created");
                } else {
                    action.edit({
                        ...data,
                        at: { ...data.at, updated: new Date() },
                    });
                    toast("Record has been edited");
                }
            }
            setCorpus((prev) => ({ ...prev, isSubmitting: false }));
        }, 2000);
        props.onSubmit();
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
                                            defaultValue={CUSTOMER_COMPONENT_COMPARISON_OPTIONS?.find(
                                                (item) => item.value === _.get(component, "data")
                                            )}
                                            onChange={(e) => {
                                                setValue(`components.${i}.data`, e.value);
                                            }}
                                            options={CUSTOMER_COMPONENT_COMPARISON_OPTIONS}
                                        />
                                    </MinimalAccordion>
                                </div>
                            );
                        }
                        case CustomerComponentEnum.Quotation: {
                            const image = _.get(component, "data.invoiceUrl", "");
                            return (
                                <div key={i}>
                                    <MinimalAccordion isExpanded title={title}>
                                        <div className="flex flex-col gap-2">
                                            <div className="grid grid-cols-2 gap-2">
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
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
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
                                                <div className="bg-white">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Created Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register(`components.${i}.data.createdDate`)}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                                        placeholder="Created Date"
                                                    />
                                                    {renderErrorMessage(
                                                        `components.${i}.data.createdDate`
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
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
                                            <ImageInput
                                                label="Invoice URL"
                                                values={image?.length ? [image] : []}
                                                path={`customers/${values.customerId}/${CustomerComponentEnum.Quotation}`}
                                                onSuccess={(e) => {
                                                    setValue(`components.${i}.data.invoiceUrl`, e[0]);
                                                }}
                                            />
                                            {renderErrorMessage(`components.${i}.data.invoiceUrl`)}
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

                            return (
                                <div key={i}>
                                    <MinimalAccordion isExpanded title={title}>
                                        <div className="">
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
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.filter(
                                                                ({ field }) => field === "select"
                                                            )?.map((item, j) => {
                                                                const options = DESIGN_2D_SELECT_OPTION(item.value)
                                                                return (
                                                                    <div
                                                                        className="bg-white"
                                                                        key={`${CustomerComponentEnum.TwoDDesign}-${i}-${k}-${j}`}
                                                                    >
                                                                        <Select
                                                                            placeholder={item.label}
                                                                            defaultValue={options?.find((option) => option.value === data[item.value])}
                                                                            onChange={(e) => {
                                                                                setValue(
                                                                                    `components.${i}.data.${k}.${item.value}`,
                                                                                    e?.value?.length ? e.value : ""
                                                                                );
                                                                            }}
                                                                            options={options}
                                                                        />
                                                                        {renderErrorMessage(`components.${i}.data.${k}.${item.value}`)}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
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
                                                                const items = value?.length ? [value] : [];
                                                                return (
                                                                    <div key={j}>
                                                                        <ImageInput
                                                                            label={item.label}
                                                                            key={j}
                                                                            path={`/customers/${values.customerId}/${CustomerComponentEnum.TwoDDesign}`}
                                                                            values={items}
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
                    {isCreateAction ? "Create" : "Edit"} Component
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

type TProps = { mode: ComponentModeEnum; item: TCustomerItem; onSubmit: VoidFunction; };
// 631

function DESIGN_2D_SELECT_OPTION(e: string) {
    switch (e) {
        case 'design':
            return _.labelify(COMPONENT_DESIGN2D_DESIGN_OPTIONS)
        case 'finish':
            return _.labelify(COMPONENT_DESIGN2D_FINISH_OPTIONS)
        default:
            return []
    }
}
