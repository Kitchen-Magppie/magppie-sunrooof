import { useFormContext } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosRemoveCircleOutline } from "react-icons/io";
//====================================================================

import {
    _,
    CustomerComponentEnum,
    DESIGN_2D_SELECT_OPTION,
    TCustomerComponentDesign2DDataItem,
    TCustomerComponentDesign2DItem,
    TCustomerItem
} from "../../../../../types";
import {
    FieldCautation,
    //  FieldCautation,
    MinimalAccordion,
    MinimalDropdown
} from "../../../components";
import {
    CUSTOMER_COMPONENT_2D_DESIGN_FIELD_ENTRY_ITEM,
    CUSTOMER_COMPONENT_2D_DESIGN_LAYOUT_FIELD_OPTIONS,
    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ENTRY_ITEM,
    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
    // INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM
} from "../../../mocks";
import { useAppSelector } from "../../../../../redux";
import { CustomConfirmationDialog, ImageInput } from "../../../../../components";



function CustomerFormTwoDDesignSection(props: TProps) {
    const { title, index, item, isCreateAction } = props;
    const { watch, register, formState: { errors }, setValue } = useFormContext<TCustomerItem>();
    const values = watch();
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const { value: proposedLayouts } = useAppSelector((state) => state.Cms.ProposedLayout);
    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return (<p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>);
        }
        return <></>;
    }, [errors]);

    const renderCustomDeleteConfirmationDialog = useMemo(() => {
        const onConfirm = () => {
            setValue(`components.${index}`, {
                ...item,
                data: item.data.filter((_, currentIndex) => currentIndex !== corpus.confirmation.index)
            })
            setCorpus(INIT_CORPUS)

        }
        return <CustomConfirmationDialog show={!!corpus?.confirmation}
            variant="danger"
            text={{
                header: 'Delete Confirmation',
                remark: `Are you sure you want to delete layout #${corpus?.confirmation?.index + 1}? This will also affect the quotation.`
            }}
            onHide={() => {
                setCorpus(INIT_CORPUS)
            }} onConfirm={onConfirm} />
    }, [corpus.confirmation, index, item, setValue])

    return (<div>
        <MinimalAccordion isExpanded title={title}>
            <div>
                <FieldCautation
                    onClickAdd={() => {
                        setValue(`components.${index}.data`, [
                            ...item.data,
                            INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
                        ]);
                    }}
                />
                {item.data?.map((data, j) => {
                    const hasMoreThenOne = item?.data?.length > 1
                    const layouts = proposedLayouts?.filter(((layout) => [values.id, values.customerId]?.includes(layout.customerId)))?.map((item) => ({
                        label: item.label,
                        value: item.customerId,
                        id: item.id
                    }));
                    const defaultValue = layouts?.find((option) => _.get(option, 'id') === data.proposedLayoutId)
                    const onClickDeleteButton = () => {
                        if (hasMoreThenOne)
                            setCorpus((prev) => ({
                                ...prev,
                                confirmation: {
                                    data,
                                    index: j
                                }
                            }))
                    }
                    return (<div
                        key={`${CustomerComponentEnum.TwoDDesign}-${index}-${j}`}
                        className="p-4 border shadow-sm rounded-lg  dark:border-gray-600 dark:bg-gray-800 my-3"
                    >
                        <div className="text-gray-400 italic text-lg flex justify-between">
                            #{j + 1}
                            <div className="py-1 ">
                                <IoIosRemoveCircleOutline
                                    className={
                                        hasMoreThenOne
                                            ? "text-red-500 cursor-pointer hover:text-red-800"
                                            : ""
                                    }
                                    onClick={onClickDeleteButton}
                                />
                            </div>
                        </div>
                        <div className="grid  gap-2 mb-2">
                            <div className={`bg-white ${defaultValue ? 'pointer-events-none' : ''}`}>
                                <MinimalDropdown
                                    placeholder='Proposed Layout'
                                    defaultValue={defaultValue}
                                    onChange={(e) => {
                                        const currentProposedLayoutId = _.get(e, 'id')
                                        const currentLayout = proposedLayouts?.find((layout) => layout.id === currentProposedLayoutId)

                                        if (currentLayout) {
                                            setValue(`components.${index}.data.${j}.proposedLayoutId`, currentProposedLayoutId)
                                            setValue(`components.${index}.data.${j}.entries`, currentLayout.entries)
                                            setValue(`components.${index}.data.${j}.leftImage`, currentLayout.url.customer)
                                            setValue(`components.${index}.data.${j}.rightImage`, currentLayout.url.customer)

                                        }
                                    }}
                                    options={layouts}
                                />
                                {renderErrorMessage(`components.${index}.data.${j}.proposedLayout`)}
                            </div>
                        </div>
                        <div className="border rounded-lg border-gray-300 p-2 ">
                            <div className="text-lg font-medium text-indigo-800 dark:text-gray-300 flex  justify-between align-middle flex-col">
                                Window Sunrooof
                                <FieldCautation
                                    label=" Sunrooof Window"
                                    onClickAdd={() => {
                                        const entries = data.entries || []
                                        setValue(`components.${index}.data.${j}.entries`, [
                                            ...entries,
                                            INIT_CUSTOMER_COMPONENT_2D_DESIGN_ENTRY_ITEM

                                        ])
                                    }}
                                />
                                {renderErrorMessage(`components.${index}.data.${j}.entries`)}


                            </div>
                            {data?.entries?.map((entry, k) => {
                                const entryLength = data?.entries?.length
                                return <div key={`${index}-${k}-${j}`} className={`${(entryLength - 1 === k) ? '' : 'border-b-2 border-dashed'}`}>
                                    <div className="text-gray-400 italic text-sm flex justify-between">
                                        #{j + 1}.{k + 1}
                                        <div className="py-1">
                                            <IoIosRemoveCircleOutline
                                                className={
                                                    entryLength > 1
                                                        ? "text-red-500 cursor-pointer hover:text-red-800"
                                                        : ""
                                                }
                                                onClick={() => {
                                                    if (entryLength > 1)
                                                        setValue(
                                                            `components.${index}.data`,
                                                            item.data.filter((_, m) => m !== j)
                                                        );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2 ">

                                        {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_ENTRY_ITEM?.map((row, fieldIndex) => {
                                            const { value, field, label, placeholder, lock } = row
                                            const proposedOptions = proposedLayouts?.filter(({ customerId }) => isCreateAction ? true : customerId === values.customerId)
                                            const options = DESIGN_2D_SELECT_OPTION(
                                                value,
                                                proposedOptions,
                                                entry['design']
                                            );
                                            const defaultValue = (options?.find((option) => option.value === entry[value]))

                                            switch (field) {
                                                case 'select':
                                                    return <div key={`entry-${index}-${fieldIndex}`}>
                                                        <MinimalDropdown
                                                            defaultValue={defaultValue}
                                                            placeholder={label}
                                                            isDisabled={(lock && !!defaultValue?.value?.length)}
                                                            options={options}
                                                            onChange={(e) => {
                                                                setValue(`components.${index}.data.${j}.entries.${k}.${value}`, e.value)
                                                            }}
                                                        />
                                                        {renderErrorMessage(`components.${index}.data.${j}.entries.${k}.${value}`)}

                                                    </div>

                                                default: {
                                                    const disabled = lock && !!(value === 'quantity' ? Number(entry[value]) > 0 : `${entry[value]}`?.length)
                                                    return <div
                                                        className="bg-white"
                                                        key={`entry-${index}-${fieldIndex}`}
                                                    >
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {label}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            disabled={disabled}
                                                            {...register(`components.${index}.data.${j}.entries.${k}.${value}`)}
                                                            value={entry[value]}
                                                            placeholder={placeholder}
                                                            className={`mt-1 block w-full p-3 border ${disabled ? 'text-gray-500 bg-gray-100' : ''} border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                        />
                                                        {renderErrorMessage(`components.${index}.data.${j}.entries.${k}.${value}`)}
                                                    </div>
                                                }
                                            }
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                        {/* <div className="grid grid-cols-2 gap-5 my-5">

                            {_.filter(CUSTOMER_COMPONENT_2D_DESIGN_LAYOUT_FIELD_OPTIONS, { field: 'image' })?.map((item, j) => {
                                return <div key={j} className="border py-1 rounded-sm">
                                    <LazyLoadImage src={`${_.get(data, item.value, '')}`} key={j} />
                                </div>
                            })}
                        </div> */}
                        <div className="grid grid-cols-2 gap-2">
                            {CUSTOMER_COMPONENT_2D_DESIGN_LAYOUT_FIELD_OPTIONS?.filter(
                                (item) => item.field === "image"
                            )?.map((item, j) => {
                                const value = `${_.get(data, `${item.value}`, '')}`;
                                const items = value?.length ? [value] : [];
                                return (
                                    <div key={j}>
                                        <ImageInput
                                            label={item.label}
                                            key={j}
                                            path={`/customers/${values.customerId}/${CustomerComponentEnum.TwoDDesign}`}
                                            values={items as string[]}
                                            onSuccess={(e) => {
                                                setValue(
                                                    `components.${index}.data.${j}.${item.value}`,
                                                    e[0]
                                                );
                                            }}
                                        />
                                        {renderErrorMessage(
                                            `components.${index}.data.${j}.${item.value}`
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
        {renderCustomDeleteConfirmationDialog}
    </div>
    );
}
type TProps = {
    title: string,
    index: number,
    item: TCustomerComponentDesign2DItem,
    isCreateAction: boolean
}
type TCorpus = { confirmation?: { data: TCustomerComponentDesign2DDataItem, index: number } }
const INIT_CORPUS: TCorpus = {}
export default CustomerFormTwoDDesignSection;
