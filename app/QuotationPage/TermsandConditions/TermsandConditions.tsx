import { terms } from './data'

const TermsandConditions = () => {
    return (
        <div className="flex flex-col w-full mb-20" id="terms">
            <div className="flex items-center justify-center bg-[#1E1E1E] mb-10 py-10">
                <h1 className="text-5xl text-white">Terms & Conditions</h1>
            </div>
            <div className="container mx-auto px-10">
                <ul>
                    {terms.map((term) => {
                        return (
                                <li className="text-3xl list-decimal lg:text-2xl pb-4" key={term.id}>
                                    {term.content}
                                </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TermsandConditions
