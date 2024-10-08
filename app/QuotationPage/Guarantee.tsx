const Guarantee = () => {
    return (
        <div className="flex flex-col container mx-auto py-10 justify-center">
            <div>
                <h1 className="text-5xl lg:text-5xl lg:font-bold mb-6">5 year guarantee</h1>
                <p className="text-3xl lg:text-2xl pb-4">
                    Which includes all 4 components :
                </p>
            </div>
            <hr className="border-2" />
            <div className="pb-4 pt-4">
                <p className="text-3xl lg:text-2xl py-2">1. Driver</p>
                <p className="text-3xl lg:text-2xl py-2">2. Light Consoles</p>
                <p className="text-3xl lg:text-2xl py-2">3. Controller</p>
                <p className="text-3xl lg:text-2xl py-2">4. Wooden Rafters</p>
            </div>
            <hr className="border-2" />
            <div className="text-3xl lg:text-2xl pb-2 pt-4">
                If there is any manufacturing defect to any of these 4
                components then we will replace it in the span of 5 years.
            </div>
        </div>
    )
}

export default Guarantee
