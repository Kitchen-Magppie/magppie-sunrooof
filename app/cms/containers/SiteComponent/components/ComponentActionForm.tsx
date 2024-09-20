import { useCallback, useState } from 'react'
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
    TComponentMode,
    _,
    ComponentModeEnum,
    ViewPortEnum,
    CmsComponentMediaEnum,
    INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
    TCustomerComponentItem,
} from '../../../../../types'
import { ImageInput } from '../../../../../components'
import { MinimalAccordion, FieldCautation } from '../../../components'
import {
    FormTypography,
    FormItemTypography,
    FormViewPortMedia
} from '.'

export default function ComponentActionForm(props: TProps) {

    const [corpus, setCorpus] = useState({ isSubmitting: false })
    const { item } = props;
    const isCreateMode = props.mode === ComponentModeEnum.Create
    const validateSchema = Yup.object().shape({
        name: Yup.string().required(),
        components: Yup.array().of(Yup.object().shape({
            typography: typographySchema,
            links: linkSchema,
            items: Yup.array().of(typographyItemSchema).required(),
            gallery: Yup.array().of(sectionImageItemSchema),
            icons: Yup.array().of(sectionImageItemSchema),
        }))
    })

    const methods = useForm({
        defaultValues: item,
        // mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: yupResolver(validateSchema),
    })
    const {
        // register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = methods

    const values = watch()


    // const CustomerAction = useFirebaseCustomerSiteComponentAction()
    const onSubmit = handleSubmit((data: TCustomerComponentItem) => {
        console.log(data)
        setCorpus((prev) => ({ ...prev, isSubmitting: true }))
        setTimeout(() => {
            if (isCreateMode) {
                // CustomerAction.add(data)
            } else {
                // CustomerAction.edit({
                //     ...data,
                //     id: item.id
                // })

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
            {values?.components.map((component, i) => {
                return <form key={i} onSubmit={onSubmit} className="bg-white p-6 overflow-y-scroll h-[80vh] ">
                    <div className=" mb-2">
                        <FieldCautation disableAppendButton />
                    </div>
                    {/* <div>
        <label className="block text-sm font-medium text-gray-700">
            Name
        </label>
        <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {renderErrorMessage('name')}
    </div> */}
                    <MinimalAccordion isExpanded title='Typography' icon={<RiText />} >
                        <FormTypography />
                    </MinimalAccordion>
                    <MinimalAccordion isExpanded title='Items' icon={<MdTextFields />}>
                        <div className="mb-3">
                            <FieldCautation label='Array Field'
                                onClickAdd={() => {
                                    // const filterOrder = _.applyOrder(_.map(values.items, 'orderId'))
                                    setValue(`components.${i}.items`,
                                        [...values.components[i].items,
                                            INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY
                                        ])
                                }}
                            />

                        </div>
                        <FormItemTypography index={i} />
                    </MinimalAccordion>
                    <MinimalAccordion title='Links' icon={<BsWindowStack />}>
                        <div className=''>
                            <ImageInput
                                label='Icon'
                                values={component.links.icon?.length ? [component.links.icon] : []}
                                path={`customer-site-components/icons`}
                                onSuccess={(e) => {
                                    setValue(`components.${i}.links.icon`, e[0])
                                }}
                            />
                            {renderErrorMessage('links.icon.message')}
                        </div>
                        <div className="mb-4">
                            <ImageInput
                                values={component.links.bg?.length ? [component.links.bg] : []}
                                label='Background'
                                path={`customer-site-components/backgrounds`}
                                onSuccess={(e) => {
                                    setValue(`components.${i}.links.bg`, e[0])
                                }}
                            />
                            {renderErrorMessage('errors.links.bg')}
                        </div>

                        <div className="mb-4">
                            <ImageInput
                                label='Illustration'
                                values={component.links.illustration?.length ? [component.links.illustration] : []}
                                path={`customer-site-components/illustrations`}
                                onSuccess={(e) => {
                                    setValue(`components.${i}.links.illustration`, e[0] || '')
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
            })}
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
    item: TCustomerComponentItem,
    // meta?: TComponentMeta,
    mode: TComponentMode
}
