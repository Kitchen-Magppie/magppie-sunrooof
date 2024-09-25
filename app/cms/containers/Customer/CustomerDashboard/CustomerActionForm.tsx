import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
//====================================================================

import {
    _,
    ComponentModeEnum,
    CustomerComponentEnum,
    TCustomerComponentComparisonItem,
    TCustomerComponentDesign2DDataItem,
    TCustomerItem,
    validateCustomerItemSchema
} from '../../../../../types';
import {
    CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS,
    CUSTOMER_COMPONENT_VALUE_OPTIONS,
} from '../../../mocks';
import { MinimalAccordion } from '../../../components';
import { ImageInput } from '../../../../../components';

export function CustomerActionForm(props: TProps) {

    const [corpus, setCorpus] = useState({ isSubmitting: false })
    const { mode, item } = props;

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validateCustomerItemSchema),
        defaultValues: item
    });

    const values = watch()

    console.log(values)
    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return <p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>
        }
        return ''
    }, [errors])

    const onSubmit = (data: TCustomerItem) => {
        console.log('Form Data:', data);
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
            <div className="bg-white px-6 overflow-y-scroll">
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    {...register('name')}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {renderErrorMessage('name')}
            </div>
            <div className="px-6">
            </div>
        </div>

        {/* Components (rendering depends on the type of component) */}
        <div className='px-6'>
            {values?.components?.map((component, i) => {
                const value = _.get(component, 'value')
                const title = CUSTOMER_COMPONENT_VALUE_OPTIONS?.find((item) => item.value === value).label
                switch (value) {
                    case CustomerComponentEnum.Client:
                        return <div key={i}>
                            <MinimalAccordion isExpanded title={title}>
                                <div className="grid grid-cols-2">
                                    <div className="bg-white px-6 overflow-y-scroll">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register(`components.${i}.data.name`)}
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {renderErrorMessage(`components.${i}.data.name`)}
                                    </div>
                                    <div className="bg-white  overflow-y-scroll">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            {...register(`components.${i}.data.description`)}
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {renderErrorMessage(`components.${i}.data.description`)}
                                    </div>
                                </div>


                            </MinimalAccordion>
                        </div>
                    case CustomerComponentEnum.Comparison: {
                        return <div key={i}>
                            <MinimalAccordion isExpanded title={title}>
                                <div className="grid grid-cols-2 gap-1">
                                    {(component as TCustomerComponentComparisonItem).data.map((item, j) => {
                                        const data = {
                                            before: item.image.before?.length ? [item.image.before] : [],
                                            after: item.image.after?.length ? [item.image.after] : [],
                                        }
                                        return <div key={`component-${i}-${j}`}>
                                            <div className="">#{j + 1}</div>
                                            <ImageInput
                                                values={data.before}
                                                path=''
                                                label='Before'
                                                onSuccess={() => {
                                                    // setValue(`components.${i}.data.${j}.image.before`, '')
                                                }} />
                                            <ImageInput
                                                values={data.after}
                                                path=''
                                                label='After'
                                                onSuccess={() => {
                                                    // setValue(`components.${i}.data.${j}.image.after`, '')
                                                }} />
                                        </div>
                                    })}

                                </div>
                            </MinimalAccordion>
                        </div>
                    }
                    case CustomerComponentEnum.Quotation: {
                        const image = _.get(component, 'data.invoiceUrl', '')
                        return <div key={i}>
                            <MinimalAccordion isExpanded title={title}>
                                <div className="flex flex-col gap-2 px-6">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white  overflow-y-scroll">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register(`components.${i}.data.name`)}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {renderErrorMessage(`components.${i}.data.name`)}
                                        </div>
                                        <div className="bg-white  overflow-y-scroll">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Name
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
                                        <div className="bg-white  overflow-y-scroll">
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
                                        <div className="bg-white  overflow-y-scroll">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Created Date
                                            </label>
                                            <input
                                                type="text"
                                                {...register(`components.${i}.data.createdDate`)}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {renderErrorMessage(`components.${i}.data.createdDate`)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white  overflow-y-scroll">
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
                                        <div className="bg-white  overflow-y-scroll">
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
                                    <ImageInput label='Invoice URL'
                                        values={image?.length ? [image] : []}
                                        path={`customers/${values.customerId}/quotations`}
                                        onSuccess={() => { }} />
                                </div>
                            </MinimalAccordion>
                        </div>
                    }
                    case CustomerComponentEnum.ThreeDDesign: {
                        const images = {
                            first: _.get(component, 'data.0', ''),
                            last: _.get(component, 'data.1', '')
                        }
                        return <div key={i}>
                            <MinimalAccordion isExpanded title={title}>
                                <div className="grid grid-cols-2 gap-2">
                                    <ImageInput
                                        values={images.first?.length ? [images.first] : []}
                                        label='#1'
                                        path='' onSuccess={() => { }}
                                    />
                                    <ImageInput
                                        label='#2'
                                        values={images.last?.length ? [images.last] : []}
                                        path='' onSuccess={() => { }}
                                    />
                                </div>

                            </MinimalAccordion>
                        </div>
                    }
                    case CustomerComponentEnum.TwoDDesign: {
                        // console.log(component)
                        return <div key={i}>
                            <MinimalAccordion isExpanded title={title}>
                                {(_.get(component, 'data', []) as TCustomerComponentDesign2DDataItem[])?.map((data, k) => {
                                    return (<div key={`${CustomerComponentEnum.TwoDDesign}-${i}-${k}`} className="flex flex-col gap-2 px-6">
                                        <div className='text-gray-400 italic  text-lg'>
                                            #{k + 1}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.filter((item) => item.field === 'text')?.map((item, j) => {
                                                // if (item.label?.includes('Image')) {
                                                //     return <div className="">
                                                //         <ImageInput label={item.label}
                                                //             key={j}
                                                //             path={`/customers/${values.customerId}/${CustomerComponentEnum.TwoDDesign}`}
                                                //             values={[data[item.value]]}
                                                //             // values={[component.data[field.value]]}
                                                //             onSuccess={() => { }}
                                                //         />
                                                //     </div>
                                                // }
                                                return (<div className="bg-white" key={`${CustomerComponentEnum.TwoDDesign}-${i}-${k}-${j}`}>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        {item.label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register(`components.${i}.data.${k}.${item.value}`)}
                                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                    {renderErrorMessage(`components.${i}.data.${k}.${item.value}`)}
                                                </div>
                                                )
                                            })}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.filter((item) => item.field === 'image')?.map((item, j) => {
                                                const value = data[item.value]
                                                const items = value?.length ? [value] : []
                                                return <div key={j}>
                                                    <ImageInput label={item.label}
                                                        key={j}
                                                        path={`/customers/${values.customerId}/${CustomerComponentEnum.TwoDDesign}`}
                                                        values={items}
                                                        onSuccess={() => { }}
                                                    />
                                                </div>
                                            })}
                                        </div>
                                    </div>)
                                })}
                            </MinimalAccordion>
                        </div>

                    }
                    default:
                        return <div key={i} />
                }
            })}
            {errors.components && <p>{errors.components.message}</p>}
            <button
                disabled={corpus.isSubmitting}
                type="submit"
                onClick={() => {
                    setCorpus({ isSubmitting: true })
                }}
                className=" flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {mode === ComponentModeEnum.Create ? 'Create' : 'Edit'} Component
                {corpus.isSubmitting ? <AiOutlineLoading3Quarters className='text-xl animate-spin' /> : <IoCreateOutline className='text-xl' />}
            </button>
        </div>
    </form>
    );
}

type TProps = { mode: ComponentModeEnum, item: TCustomerItem }
