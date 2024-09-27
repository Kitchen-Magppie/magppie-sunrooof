import { RouteObject } from 'react-router-dom'

//====================================================================

import {
    Projects,
    SignIn,
    User,
} from '../containers'
import { useFirebaseCmsAuthListener } from '../utils/firebase'
import { ProtectedRoute } from '../components'
import Customer from '../containers/Customer'
import { useAppService } from '../hooks'

export default function CmsRoutes() {
    useFirebaseCmsAuthListener()
    useAppService()

    return {
        path: 'cms',
        element: <ProtectedRoute />,
        children: [
            {
                path: 'sign-in',
                element: <SignIn />,
            },
            {
                path: 'projects',
                element: <Projects />,
            },
            {
                path: '',
                element: <Customer />,
            },
            {
                path: 'users',
                element: <User />,
            },
        ],
    } as RouteObject
}
