// import Form from '../components/Form'
import InvoiceGenerator from '../components/InvoiceGenerator'
import Navbar from '../components/Navbar'

const QuotationGenerator = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <InvoiceGenerator />
        </div>
    )
}

export default QuotationGenerator
