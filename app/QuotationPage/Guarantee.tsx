const Guarantee = () => {
    return (
        <div className="flex flex-col container mx-auto mx-4 py-10 justify-center">
            <div>
                <h1 className="text-6xl font-bold mb-4">5 year guarantee</h1>
                <p className="text-3xl pb-2 font-semibold">
                    which includes all 4 components :
                </p>
            </div>
            <hr className="border-2" />
            <div className="pb-2">
                <p className="text-xl py-2 font-semibold">1. Driver</p>
                <p className="text-xl py-2 font-semibold">2. Light Consoles</p>
                <p className="text-xl py-2 font-semibold">3. Controller</p>
                <p className="text-xl py-2 font-semibold">4. Wooden Rafters</p>
            </div>
            <hr className="border-2" />
            <div className="text-2xl pb-2 pt-4 font-semibold">
                If there is any manufacturing defect to any of these 4
                components then we will replace it in the span of 5 years.
            </div>
        </div>
    )
}

export default Guarantee
