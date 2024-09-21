import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

import { _, CustomerComponentEnum, TCustomerItem } from '../../../../../types';
import { CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS, CUSTOMER_COMPONENT_VALUE_OPTIONS, INIT_CUSTOMER_ITEM } from '../../../mocks';
import { MinimalAccordion } from '../../../components';
import { ImageInput } from '../../../../../components';

export function CustomerActionForm() {
    const [corpus, setCorpus] = useState({ isSubmitting: false })

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TCustomerItem>({
        resolver: yupResolver(customerItemSchema),
        defaultValues: INIT_CUSTOMER_ITEM
    });

    const values = watch()
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

    console.log(values)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}


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
                {/* <label className="h3">Components</label> */}
                {values?.components?.map((component, i) => {
                    const currentComponent = CUSTOMER_COMPONENT_VALUE_OPTIONS?.find((item) => item.value === component.value)
                    switch (component.value) {
                        case CustomerComponentEnum.Client:
                            return <div key={i}>
                                <MinimalAccordion isExpanded title={currentComponent.label}>
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
                                    <div className="bg-white px-6 overflow-y-scroll">
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

                                </MinimalAccordion>


                            </div>

                        case CustomerComponentEnum.Comparison:
                            return <div key={i}>
                                <MinimalAccordion isExpanded title={currentComponent.label}>
                                    <div className="flex flex-col gap-2">
                                        <ImageInput
                                            path=''
                                            onSuccess={() => { }} />
                                        <ImageInput
                                            path=''
                                            onSuccess={() => { }} />
                                    </div>
                                </MinimalAccordion>
                            </div>
                        case CustomerComponentEnum.Quotation:
                            return <div key={i}>
                                <MinimalAccordion isExpanded title={currentComponent.label}>
                                    <div className="flex flex-col gap-2 px-6">
                                        <div className="bg-white  overflow-y-scroll">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register(`components.${i}.data.header`)}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {renderErrorMessage(`components.${i}.data.header`)}
                                        </div>
                                        <ImageInput path='' onSuccess={() => { }} />
                                    </div>
                                </MinimalAccordion>
                            </div>
                        case CustomerComponentEnum.ThreeDDesign:
                            return <div key={i}>
                                <MinimalAccordion isExpanded title={currentComponent.label}>
                                    <div className="flex flex-col gap-2 px-6">

                                        <ImageInput path='' onSuccess={() => { }} />
                                        <ImageInput path='' onSuccess={() => { }} />

                                    </div>
                                </MinimalAccordion>
                            </div>
                        case CustomerComponentEnum.TwoDDesign:
                            return <div key={i}>
                                <MinimalAccordion isExpanded title={currentComponent.label}>
                                    <div className="flex flex-col gap-2 px-6">
                                        {CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS?.map((field, j) => {
                                            return (<div className="bg-white  overflow-y-scroll" key={j}>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register(`components.${i}.data.${field.value}`)}
                                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {renderErrorMessage(`components.${i}.data.${field.value}`)}
                                            </div>
                                            )
                                        })}
                                        <ImageInput label='Map' path='' onSuccess={() => { }} />
                                        <ImageInput path='' onSuccess={() => { }} />
                                    </div>
                                </MinimalAccordion>
                            </div>
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
                    Component Action
                    {/* {isCreateMode ? 'Create' : 'Edit'} Component */}
                    {corpus.isSubmitting ? <AiOutlineLoading3Quarters className='text-xl animate-spin' /> : <IoCreateOutline className='text-xl' />}
                </button>
            </div>

        </form>
    );
}

const comparisonDataItemSchema = yup.object().shape({
    value: yup.string().required(),
    image: yup.object().shape({
        before: yup.string().required(),
        after: yup.string().required(),
    }).required(),
});

const customerComponentComparisonItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Comparison]).required(),
    data: yup.array().of(comparisonDataItemSchema).required(),
});

const customerComponentClientItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Client]).required(),
    data: yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
    }).required(),
});

const customerComponentQuotationItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Quotation]).required(),
    data: yup.object({
        header: yup.string().required(),
        illustration: yup.string().required(),
    }).required(),
});

const customerComponentDesign2DItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.TwoDDesign]).required(),
    data: yup.object().shape({
        designBy: yup.string().required(),
        approvedBy: yup.string().required(),
        deisgn: yup.string().required(),
        finish: yup.string().required(),
        callingHeightOnSite: yup.string().required(),
        afterInstallation: yup.string().required(),
        yourPlan: yup.string().required(),
        header: yup.string().required(),
        leftImage: yup.string().required(),
        rightImage: yup.string().required(),
    }).required(),
});

const customerComponentDesign3DItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.ThreeDDesign]).required(),
    data: yup.array().of(yup.string().required()).required(),
});

const customerComponentSchema = yup.mixed().oneOf([
    customerComponentClientItemSchema,
    customerComponentComparisonItemSchema,
    customerComponentQuotationItemSchema,
    customerComponentDesign2DItemSchema,
    customerComponentDesign3DItemSchema,
]);

const customerItemSchema = yup.object().shape({
    name: yup.string().required(),
    components: yup.array().of(customerComponentSchema).required(),
    id: yup.string().required(),
    componentId: yup.string().required(),
    at: yup.object().shape({
        created: yup.date().required(),
        updated: yup.date().required(),
    }).required(),
});
