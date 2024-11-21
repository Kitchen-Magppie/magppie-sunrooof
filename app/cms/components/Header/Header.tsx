import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import _ from 'lodash';
// ===============================================================================

import { useAppDispatch, useAppSelector } from '../../../../redux'
import { useFirebaseCmsAuthAction } from '../../utils/firebase/use-firebase-cms-actions';
import { setAuthSignOut } from '../../redux/slices/Auth.slice';
import { Tooltip } from 'flowbite-react';
import { useProposedLayoutListener } from '../../hooks';
import { useFirebaseCmsCustomerListener } from '../../utils/firebase';

export default function Header() {
    const user = useAppSelector(({ Cms }) => Cms.Auth);
    const AuthAction = useFirebaseCmsAuthAction()
    useProposedLayoutListener()
    useFirebaseCmsCustomerListener()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if (!user?.loading) {
    //         if (!user?.value) {
    //             navigate('/cms/sign-in')
    //         }
    //     }
    // }, [navigate, user?.loading, user?.value])

    const onClickSignOut = useCallback(() => {
        dispatch(setAuthSignOut())
        AuthAction.signOut()
        navigate('/cms/sign-in')
    }, [AuthAction, dispatch, navigate])
    if (user.value) {
        return (<nav className="bg-white border-gray-200 border-b-2 fixed left-0 right-0 z-20">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <Link to="/cms">
                        <span className="self-center uppercase text-2xl font-semibold whitespace-nowrap">
                            sunrooof
                        </span>
                    </Link>
                </div>
                <div className="flex flex-row gap-3 justify-items-center  align-middle">
                    <div className="font-medium flex flex-col border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                        Welcome,
                    </div>

                    <div className='text-purple-600 font-medium'>
                        {_.get(user, 'value.name', 'User')}
                    </div>
                    <div >
                        <Tooltip content='Sign-Out' style='light' placement='bottom'>

                            <button
                                data-tooltip-target="tooltip-default"
                                type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm p-1 py-1 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                <MdLogout onClick={onClickSignOut}
                                    className='cursor-pointer hover:text-gray-500 '
                                />
                            </button>
                        </Tooltip>

                    </div>
                </div>
            </div>
        </nav>
        )
    }
    return <></>
}
