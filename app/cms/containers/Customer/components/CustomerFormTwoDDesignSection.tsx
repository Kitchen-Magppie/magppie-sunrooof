import { useFormContext } from "react-hook-form";
import { useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosRemoveCircleOutline } from "react-icons/io";
//====================================================================

import { _, CustomerComponentEnum, DESIGN_2D_SELECT_OPTION, TCustomerComponentDesign2DItem, TCustomerItem } from "../../../../../types";
import { FieldCautation, MinimalAccordion, MinimalDropdown } from "../../../components";
import {
    CUSTOMER_COMPONENT_2D_DESIGN_FIELD_ENTRY_ITEM,
    CUSTOMER_COMPONENT_2D_DESIGN_LAYOUT_FIELD_OPTIONS,
    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ENTRY_ITEM,
    INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM
} from "../../../mocks";
import { useAppSelector } from "../../../../../redux";



function CustomerFormTwoDDesignSection(props: TProps) {
    const { title, index, item, isCreateAction } = props;
    const { watch, register, formState: { errors }, setValue } = useFormContext<TCustomerItem>();
    const values = watch() as TCustomerItem;
    const proposedLayouts = useAppSelector((state) => state.Cms.ProposedLayout.value);
    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return (<p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>);
        }
        return <></>;
    }, [errors]);
    return (<div >
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
                    const currentData = item.data[j]
                    const hasMoreThenOne = item.data?.length > 1;
                    console.log(currentData)
                    const layouts = proposedLayouts?.map((item) => ({
                        label: item.label,
                        value: item.customerId,
                        id: item.id,

                    }));
                    return (<div
                        key={`${CustomerComponentEnum.TwoDDesign}-${index}-${j}`}
                        className="p-4 border shadow-sm rounded-lg  dark:border-gray-600 dark:bg-gray-800 my-3"
                    >
                        <div className="text-gray-400 italic text-lg flex justify-between">
                            #{j + 1}
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
                                                `components.${index}.data`,
                                                item.data.filter((_, m) => m !== j)
                                            );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid  gap-2 mb-2">
                            <div className="bg-white">
                                <MinimalDropdown
                                    placeholder='Proposed Layout'
                                    defaultValue={layouts?.find((option) => _.get(option, 'id') === data.proposedLayoutId)}
                                    onChange={(e) => {
                                        console.log(e)
                                    }}
                                    options={layouts}
                                />
                                {renderErrorMessage(`components.${index}.data.${j}.proposedLayout`)}
                            </div>
                        </div>
                        <div className="border rounded-sm border-gray-300 p-2">

                            <div className="text-lg font-medium text-indigo-800 dark:text-gray-300 flex  justify-between align-middle">

                                <FieldCautation
                                    label=" Sunrooof Window"
                                    onClickAdd={() => {
                                        const entries = currentData.entries || []
                                        setValue(`components.${index}.data.${j}.entries`, [
                                            ...entries,
                                            INIT_CUSTOMER_COMPONENT_2D_DESIGN_ENTRY_ITEM

                                        ])
                                    }}
                                />



                            </div>
                            {currentData?.entries?.map((entry, k) => {
                                const entryLength = currentData?.entries?.length
                                return <div key={`${index}-${k}`} className={`${(entryLength - 1 === k) ? '' : 'border-b-2 border-dashed'}`}>
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
                                            const { value, field, label, placeholder } = row
                                            const proposedOptions = proposedLayouts?.filter(({ customerId }) => isCreateAction ? true : customerId === values.customerId)
                                            const options = DESIGN_2D_SELECT_OPTION(
                                                value,
                                                proposedOptions,
                                                currentData.design
                                            );
                                            const defaultValue = (options?.find((option) => entry[value] === option.value))

                                            switch (field) {
                                                case 'select':
                                                    return <div key={`entry-${index}-${fieldIndex}`}>
                                                        <MinimalDropdown
                                                            defaultValue={defaultValue}
                                                            placeholder={label}
                                                            options={options}
                                                            onChange={(e) => {
                                                                setValue(`components.${index}.data.${j}.entries.${k}.${value}`, e.value)
                                                            }}
                                                        />
                                                        {renderErrorMessage(`components.${index}.data.${j}.entries.${k}.${value}`)}

                                                    </div>

                                                default:
                                                    return <div
                                                        className="bg-white"
                                                        key={`entry-${index}-${fieldIndex}`}
                                                    >
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {label}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            {...register(`components.${index}.data.${j}.entries.${k}.${value}`)}
                                                            value={entry[row.value]}
                                                            placeholder={placeholder}
                                                            className={`mt-1 block w-full p-3 border ${currentData.proposedLayout?.length ? 'text-gray-500' : ''} border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                        />
                                                        {renderErrorMessage(`components.${index}.data.${j}.entries.${k}.${value}`)}
                                                    </div>
                                            }
                                        })}
                                    </div>
                                </div>
                            })}
                            {/* <div className="grid grid-cols-2 gap-2 mb-2">
                                {_.filter(CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS, { field: 'text' }).map((item, j) => {
                                    return (
                                        <div
                                            className="bg-white"
                                            key={`${CustomerComponentEnum.TwoDDesign}-${index}-${k}-${j}`}
                                        >
                                            <label className="block text-sm font-medium text-gray-700">
                                                {item.label}
                                            </label>
                                            <input
                                                type="text"
                                                {...register(`components.${index}.data.${k}.${item.value}`)}

                                                // disabled={!!currentData.proposedLayout?.length}
                                                placeholder={item.placeholder}
                                                className={`mt-1 block w-full p-3 border ${currentData.proposedLayout?.length ? 'text-gray-500' : ''} border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            />
                                            {renderErrorMessage(
                                                `components.${index}.data.${k}.${item.value}`
                                            )}
                                        </div>
                                    );
                                })}
                            </div> */}
                        </div>
                        <div className="grid grid-cols-2 gap-5 m-5">

                            {_.filter(CUSTOMER_COMPONENT_2D_DESIGN_LAYOUT_FIELD_OPTIONS, { field: 'image' })?.map((item, j) => {
                                return <LazyLoadImage src={`${currentData[item.value]}`} key={j} />
                            })}
                            {/* {_.filter(CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS, { field: 'image' })?.map((item, j) => {
const value = `${_.get(currentData, `${item.value}`, '')}`;
const items = value?.length ? [value] : [];
console.log(
`components.${index}.data.${k}.${item.value}`
)
return (
<div key={j}>
<ImageInput
label={item.label}
key={j}
path={`/customers/${values.customerId}/${CustomerComponentEnum.TwoDDesign}`}
values={items as string[]}
onSuccess={(e) => {
setValue(
`components.${index}.data.${k}.${item.value}`,
e[0]
);
}}
/>
{renderErrorMessage(
`components.${index}.data.${k}.entries.${item.value}`
)}
</div>
);
})} */}
                        </div>

                    </div>
                    );
                })}
            </div>
        </MinimalAccordion>
    </div>
    );
}
type TProps = {
    title: string,
    index: number,
    item: TCustomerComponentDesign2DItem,
    isCreateAction: boolean
}
export default CustomerFormTwoDDesignSection;
