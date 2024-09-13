import { RouteObject } from 'react-router-dom'

//====================================================================

import {
    Projects,
    SignIn,
    User,
    LandingHome,
    LandingPage,
} from '../containers'
import { useFirebaseCmsAuthListener } from '../utils/firebase'
import { ProtectedRoute } from '../components'

export default function CmsRoutes() {
    useFirebaseCmsAuthListener()


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
                path: 'users',
                element: <User />,
            },
            {
                path: 'landing-page',
                element: <LandingPage />, // FIXME: To remove this route in future and also container from `cms/landing-page`;
            },
            {
                path: 'landing',
                element: <LandingHome />,
            },

        ],
    } as RouteObject
}
