// import { useFirebaseAuth } from '../appHooks/firebase/use-firebase-listeners'
import Routes from '../routes'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RouteEnum } from "./types/route";
// import CustomCircularProgress from '../app/kitchen/components/CustomCircularProgress'
// import { useFirebaseDataUser } from '../appHooks/firebase/use-firebase-data'

// React Toastify CSS
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
    // useFirebaseAuth()
    // const user = useFirebaseDataUser()
    // const navigate = useNavigate()
    // const { pathname } = useLocation()

    // useEffect(() => {
    //     if (!(user.loading || user?.value)) {
    //         if (RouteEnum.SignIn !== pathname)
    //             navigate(`/${RouteEnum.SignIn}`)
    //     }
    // }, [user.loading, user?.value, navigate, pathname])

    // @shivam
    // if route is authenticated or true show array of logged in routes else they should be logged out

    // if (user?.loading) {
    //     return <CustomCircularProgress />
    // }
    return (
        <>
            <Routes />
        </>
    )
}
