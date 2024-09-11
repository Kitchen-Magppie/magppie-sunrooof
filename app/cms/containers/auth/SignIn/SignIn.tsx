import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

//====================================================================

import { useFirebaseCmsAuthAction } from '../../../../../app/cms/utils/firebase/use-firebase-cms-actions'
import CircularProgress from '../../../../../components/CircularProgress'
import { setAuth } from '../../../redux/slices/Auth.slice'
import { INIT_SUPER_USER } from '../../../types/SuperUser'

export default function CmsSignIn() {
    return (
        <div className="min-h-screen flex md:flex-row ">
            <div className="w-full md:w-1.2/4 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">
                        CMS SignIn
                    </h2>
                    <SignInForm />
                </div>
            </div>
        </div>
    )
}

export function SignInForm() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
        watch,
    } = useForm({ resolver: yupResolver(schema) })

    const navigate = useNavigate()
    const AuthAction = useFirebaseCmsAuthAction()
    const values = watch()

    const dispatch = useDispatch()
    const isError = !!_.keys(errors).length
    const helperText = (name: 'email' | 'password') => {
        return (
            <small className="text-xs text-red-500">
                {'root' in errors
                    ? 'Invalid Credentials'
                    : _.get(errors, `${name}.message`)}
            </small>
        )
    }

    const onSubmit = handleSubmit((data: TFormInput) => {
        setValue('loading', true)
        // dispatch(setAuthLoading(true))
        setTimeout(() => {
            AuthAction.signIn(data)
                .then((e) => {
                    if (e?.user) {
                        dispatch(setAuth({
                            ...INIT_SUPER_USER,
                            email: e.user.email
                        }))
                        navigate('/cms')
                        toast('Signed In SuccessFully')
                    }
                })
                .catch(() => {
                    setError('root', { type: 'validate' })
                    toast('Signed In Failed')
                })
                .finally(() => {
                    setValue('loading', false)

                })
        }, 500)
    })

    const renderSubmitButton = (
        <button
            type="submit"
            disabled={values?.loading}
            className={`text-white w-full text-center h-12 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center me-2 mb-2 ${isError ? 'bg-red-600' : 'bg-black'
                } uppercase text-white ${isError ? 'hover:bg-red-700' : 'bg-black'
                }  focus:outline-none focus:ring-2 ${isError ? 'focus:ring-red-500' : 'bg-black'
                } focus:ring-offset-2`}
        >
            <div className="flex justify-center items-center gap-2 w-full">
                <div>Sign In</div>
                <div className="">
                    {values.loading && <CircularProgress size="xl" />}
                </div>
            </div>
        </button>
    )

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4 ">
                <div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        className={`w-full text-xl border-t-0 border-l-0 border-r-0 ${errors.email ? 'border-red-500' : 'border-gray-400'
                            }`}
                    />
                    {helperText('email')}
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className={`w-full text-xl border-t-0 border-l-0 border-r-0 ${errors.password
                            ? 'border-red-500'
                            : 'border-gray-400'
                            }`}
                    />
                    {helperText('password')}
                </div>
                <div className="text-right text-sm cursor-pointer">
                    Forgot Password
                </div>
                <div>{renderSubmitButton}</div>
            </form>
        </>
    )
}

type TFormInput = { email: string; password: string }

const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    loading: yup.boolean(),
})
