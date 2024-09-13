import { terms } from './data'

const TermsandConditions = () => {
    return (
        <div className="flex flex-col w-full mb-20">
            <div className='flex items-center justify-center bg-[#77726b] mb-10 py-10'>
                <h1 className='text-6xl font-bold text-white'>Terms & Conditions</h1>
            </div>
            <div className='container mx-auto'>
                <ul>
                    {terms.map((term) => {
                        return <li className="list-disc text-2xl" key={term.id}>{term.content}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TermsandConditions
