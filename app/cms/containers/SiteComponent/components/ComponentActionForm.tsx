import { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import {
    CiDesktop,
    // CiMobile1
} from "react-icons/ci";
import { BsWindowStack } from "react-icons/bs";
import { RiText } from "react-icons/ri";
import { MdTextFields } from "react-icons/md";
//====================================================================

import {
    INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
    TComponentMode,
    TComponentItem,
    TComponentMeta,
    _,
    ComponentModeEnum,
    ViewPortEnum,
    CmsComponentMediaEnum,
} from '../../../../../types'
import { ImageInput } from '../../../../../components'
import { MinimalAccordion, FieldCautation } from '../../../components'
import {
    FormTypography,
    FormItemTypography,
    FormViewPortMedia
} from '.'
import { useFirebaseCustomerSiteComponentAction } from '../../../utils/firebase/customer';
import { useAppSelector } from '../../../../../redux'


export default function ComponentActionForm(props: TProps) {

    const [corpus, setCorpus] = useState({ isSubmitting: false })
    const { item } = props;
    const { value } = useAppSelector((state) => state.Cms.Landing)
    const isCreateMode = props.mode === ComponentModeEnum.Create
    const filteredOrder = useMemo(() => {
        return _.applyOrder(_.map(value, 'orderId'))
    }, [value])
    const schema = Yup.object().shape({
        orderId: Yup.string()
            .required('Order ID is required')
            // .min(0, 'The number must be non-negative')
            // .integer('Order ID must be an integer')
            .test('checkValidOrderId',
                'The given Order ID is invalid.',
                (currentId) => {
                    const { prev, prefer } = filteredOrder;
                    if (isCreateMode) {
                        return !prev?.includes(currentId)
                    } else {
                        return item.orderId === currentId || Number(prefer) >= Number(item.orderId)
                    }
                })
        ,
        typography: typographySchema,
        links: linkSchema,
        items: Yup.array().of(typographyItemSchema).required(),
        name: Yup.string().required('Name is required'),
        isGallery: Yup.boolean(),
        gallery: Yup.array().of(sectionImageItemSchema),
        icons: Yup.array().of(sectionImageItemSchema),
    })
    const defaultValues = useMemo(() => {
        return {
            ...item,
            orderId: props.mode === ComponentModeEnum.Edit ? item.orderId : filteredOrder.prefer,
        };

    }, [filteredOrder.prefer, item, props.mode])

    const methods = useForm({
        defaultValues,
        // mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
    })
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = methods

    useEffect(() => {
        setValue('orderId', props.mode === ComponentModeEnum.Edit ? item.orderId : filteredOrder.prefer)
    }, [filteredOrder.prefer, item.orderId, props.mode, setValue])

    const values = watch()

    const CustomerAction = useFirebaseCustomerSiteComponentAction()
    const onSubmit = handleSubmit((data: TComponentItem) => {

        setCorpus((prev) => ({ ...prev, isSubmitting: true }))
        setTimeout(() => {
            if (isCreateMode) {
                CustomerAction.add(data)
            } else {
                CustomerAction.edit({
                    ...data,
                    id: item.id
                })

            }
            setCorpus((prev) => ({ ...prev, isSubmitting: false }))

        }, 2000)
    })

    const renderErrorMessage = useCallback((field: string) => {
        if (_.get(errors, field)) {
            return <p className="text-red-500 text-xs mt-1">
                {_.get(errors, `${field}.message`)}
            </p>
        }
        return ''
    }, [errors])

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="bg-white p-6 overflow-y-scroll h-[80vh] ">
                <div className=" mb-2">
                    <FieldCautation disableAppendButton />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Order ID
                    </label>
                    <input
                        type="text"
                        {...register('orderId')}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {renderErrorMessage('orderId')}
                </div>
                <div>
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
                <MinimalAccordion isExpanded title='Typography' icon={<RiText />} >
                    <FormTypography />
                </MinimalAccordion>
                <MinimalAccordion isExpanded title='Items' icon={<MdTextFields />}>
                    <div className="mb-3">
                        <FieldCautation label='Array Field'
                            onClickAdd={() => {
                                const filterOrder = _.applyOrder(_.map(values.items, 'orderId'))
                                setValue('items',
                                    [...values.items,
                                    {
                                        ...INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
                                        orderId: filterOrder.prefer
                                    }
                                    ])
                            }}
                        />

                    </div>
                    <FormItemTypography />
                </MinimalAccordion>
                <MinimalAccordion title='Links' icon={<BsWindowStack />}>
                    <div className=''>
                        <ImageInput
                            label='Icon'
                            values={values.links.icon?.length ? [values.links.icon] : []}
                            path={`customer-site-components/icons`}
                            onSuccess={(e) => {
                                setValue('links.icon', e[0])
                            }}
                        />
                        {renderErrorMessage('links.icon.message')}
                    </div>
                    <div className="mb-4">
                        <ImageInput
                            values={values.links.bg?.length ? [values.links.bg] : []}
                            label='Background'
                            path={`customer-site-components/backgrounds`}
                            onSuccess={(e) => {
                                setValue('links.bg', e[0])
                            }}
                        />
                        {renderErrorMessage('errors.links.bg')}
                    </div>

                    <div className="mb-4">
                        <ImageInput
                            label='Illustration'
                            values={values.links.illustration?.length ? [values.links.illustration] : []}
                            path={`customer-site-components/illustrations`}
                            onSuccess={(e) => {
                                setValue('links.illustration', e[0] || '')
                            }}
                        />
                        {renderErrorMessage('links.illustration')}
                    </div>

                </MinimalAccordion>

                <MinimalAccordion title='Icons' icon={<CiDesktop />}>
                    <FormViewPortMedia viewport={ViewPortEnum.Desktop} name={CmsComponentMediaEnum.Icon} />
                </MinimalAccordion>
                <MinimalAccordion title='Gallery ' icon={<CiDesktop />}>
                    <FormViewPortMedia viewport={ViewPortEnum.Desktop} name={CmsComponentMediaEnum.Gallery} />
                </MinimalAccordion>
                {/* <MinimalAccordion title='Icons' icon={<CiMobile1 />}>
                    <FormViewPortMedia viewport={ViewPortEnum.Mobile} name={CmsComponentMediaEnum.Gallery} />
                </MinimalAccordion>
                <MinimalAccordion title='Gallery' icon={<CiMobile1 />}>
                    <FormViewPortMedia viewport={ViewPortEnum.Mobile} name={CmsComponentMediaEnum.Icon} />
                </MinimalAccordion> */}
                <button
                    disabled={corpus.isSubmitting}
                    type="submit"
                    className=" flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isCreateMode ? 'Create' : 'Edit'} Component
                    {corpus.isSubmitting ? <AiOutlineLoading3Quarters className='text-xl animate-spin' /> : <IoCreateOutline className='text-xl' />}
                </button>
            </form>
        </FormProvider>

    )
}

const typographySchema = Yup.object().shape({
    main: Yup.string(),
    description: Yup.string(),
})
const typographyItemSchema = Yup.object().shape({
    orderId: Yup.string(),
    main: Yup.string(),
    description: Yup.string(),
})

const linkSchema = Yup.object().shape({
    icon: Yup.string().url('Not a valid URL'),
    bg: Yup.string().url('Not a valid URL'),
    illustration: Yup.string().url('Not a valid URL'),
})

const sectionImageItemSchema = Yup.object().shape({
    link: Yup.string().url('Not a valid URL'),
    typography: typographySchema,
})



type TProps = {
    item: TComponentItem,
    meta?: TComponentMeta,
    mode: TComponentMode
}
