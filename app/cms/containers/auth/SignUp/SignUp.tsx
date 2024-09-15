import { LazyLoadImage } from 'react-lazy-load-image-component'
import Form from '../components/Form'
export function CmsSignUp() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Form />
            <div className="md:w-1/2 hidden md:block">
                <LazyLoadImage
                    effect="blur"
                    // src={LoginBanner}
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}
