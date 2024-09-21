import { useCallback, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";

import { CiDesktop } from "react-icons/ci";
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
import {
    MinimalAccordion,
    FieldCautation,
    CmsCopyClipboard
} from '../../../components'
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
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = methods

    const values = watch()

    console.log(values)

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
    const renderComponentContent = useMemo(() => (values?.components.map((component, index) => {
        return <div key={index} className="bg-white p-6 overflow-y-scroll h-[80vh] ">
            <div className=" mb-2">
                <FieldCautation disableAppendButton />
            </div>
            <MinimalAccordion isExpanded title='Typography' icon={<RiText />} >
                <FormTypography index={index} />
            </MinimalAccordion>
            <MinimalAccordion isExpanded title='Items' icon={<MdTextFields />}>
                <div className="mb-3">
                    <FieldCautation label='Array Field'
                        onClickAdd={() => {
                            // const filterOrder = _.applyOrder(_.map(values.items, 'orderId'))
                            const items = [..._.get(values, `components.${index}.items`, []),
                                INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY
                            ]
                            setValue(`components.${index}.items`, items)
                        }}
                    />

                </div>
                <FormItemTypography index={index} />
            </MinimalAccordion>
            <MinimalAccordion title='Links' icon={<BsWindowStack />}>
                <div className=''>
                    <ImageInput
                        label='Icon'
                        values={component.links.icon?.length ? [component.links.icon] : []}
                        path={`customer-site-components/icons`}
                        onSuccess={(e) => {
                            setValue(`components.${index}.links.icon`, e[0])
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
                            setValue(`components.${index}.links.bg`, e[0])
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
                            setValue(`components.${index}.links.illustration`, e[0] || '')
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
        </div>
    })), [renderErrorMessage, setValue, values])

    return (<FormProvider {...methods}>
        <form onSubmit={onSubmit}>
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
            {renderComponentContent}
            <div className="px-10">
                <div className="flex flex-col gap-1">
                    <div className="">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-white  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            <FaEarthAmericas />  Genrate URL
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            URL: <div className=" underline text-blue-700"></div>
                        </div>
                        <div className="cursor-pointer">
                            <CmsCopyClipboard text='' />
                        </div>
                    </div>
                </div>

                <button
                    disabled={corpus.isSubmitting}
                    type="submit"
                    className=" flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isCreateMode ? 'Create' : 'Edit'} Component
                    {corpus.isSubmitting ? <AiOutlineLoading3Quarters className='text-xl animate-spin' /> : <IoCreateOutline className='text-xl' />}
                </button>
            </div>
        </form>
    </FormProvider>)
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
