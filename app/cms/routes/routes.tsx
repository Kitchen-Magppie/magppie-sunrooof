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
import Dashboard from '../containers/Dashboard'
// import { SiteComponent } from "./../containers"
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
                element: <Dashboard />,
            },
            {
                path: 'users',
                element: <User />,
            },
            {
                path: 'customers',
                element: <Customer />,
            },
        ],
    } as RouteObject
}
