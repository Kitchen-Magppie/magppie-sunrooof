import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import logoBlack from '../assets/logo_black.png'
import qr from '../assets/qr.png'
import { paymentTermsData } from './paymentTermsData'

const prices = {
    Classical: {
        White: 40250,
        Wood: 37950,
    },
    Modern: {
        Wood: 35650,
        White: 37950,
        Bronze: 39650,
        Grey: 39650,
    },
    'Fluted Minimalist': {
        Wooden: 35650,
        White: 37950,
        Grey: 39650,
        Bronze: 39650,
    },
    'French Window': {
        White: 55200,
    },
    'Louvered Window': {
        White: 51750,
        Wooden: 51750,
    },
    'Classical Atrium': {
        White: 40250,
        Wooden: 37950,
    },
    'Fluted Minimalist Atrium': {
        Wooden: 37950,
        Bronze: 41950,
        Grey: 41950,
    },
    'Arch Window': {
        White: 55200,
    },
    'Moorgan Premium Remote': {
        Gold: 42000,
        Black: 38500,
        Chrome: 38500,
    },
}

const InvoiceGenerator = () => {
    const [clientName, setClientName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [siteAddress, setSiteAddress] = useState('')
    const [zone, setZone] = useState('Delhi NCR')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [discount, setDiscount] = useState<number>(0)
    const [entries, setEntries] = useState([])
    const invoiceRef = useRef(null)

    const addEntry = () => {
        setEntries([
            ...entries,
            { design: '', finish: '', area: '', floor: '', qty: 1 },
        ])
    }

    const removeEntry = (index) => {
        const newEntries = entries.filter((_, i) => i !== index)
        setEntries(newEntries)
    }

    const handleChangeEntry = (index, key, value) => {
        const newEntries = [...entries]
        newEntries[index][key] = value
        setEntries(newEntries)
    }

    const generateInvoice = () => {
        const invoiceElement = invoiceRef.current
        if (invoiceElement) {
            invoiceElement.style.display = 'block'
        }
    }

    const downloadInvoice = () => {
        const invoiceElement = invoiceRef.current
        html2canvas(invoiceElement).then((canvas) => {
            const link = document.createElement('a')
            link.href = canvas.toDataURL()
            link.download = 'invoice.pdf'
            link.click()
        })
    }

    return (
        <div className="mt-32">
            <div className="content-div">
                <form id="invoiceForm">
                    <h2 className="text-3xl font-bold text-center mb-5">
                        Quotation Generator
                    </h2>
                    <div className="invoice-form-div container mx-auto max-w-2xl">
                        <div className="entry-div">
                            <div className="flex items-center justify-between">
                                <label htmlFor="clientName" className="text-lg">
                                    Client Name:
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                    type="text"
                                    id="clientName"
                                    value={clientName}
                                    onChange={(e) =>
                                        setClientName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <hr className="my-2" />
                            <div className="entryy flex items-center justify-between">
                                <label
                                    htmlFor="phoneNumber"
                                    className="text-lg"
                                >
                                    Phone Number:
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                            <hr className="my-2" />
                            <div className="entryy flex items-center justify-between">
                                <label htmlFor="email" className="text-lg">
                                    Email:
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <hr className="my-2" />
                            <div className="entryy flex items-center justify-between">
                                <label
                                    htmlFor="siteAddress"
                                    className="text-lg"
                                >
                                    Site Address:
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                    type="text"
                                    id="siteAddress"
                                    value={siteAddress}
                                    onChange={(e) =>
                                        setSiteAddress(e.target.value)
                                    }
                                />
                            </div>
                            <hr className="my-2" />
                            <div className="entryy flex items-center justify-between">
                                <label htmlFor="zone" className="text-lg">
                                    Zone:
                                </label>
                                <select
                                    id="zone"
                                    value={zone}
                                    onChange={(e) => setZone(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                >
                                    <option value="Delhi NCR">Delhi NCR</option>
                                    <option value="North India">
                                        North India
                                    </option>
                                    <option value="North-East India">
                                        North-East India
                                    </option>
                                    <option value="Central India">
                                        Central India
                                    </option>
                                    <option value="East India">
                                        East India
                                    </option>
                                    <option value="West India">
                                        West India
                                    </option>
                                    <option value="South India">
                                        South India
                                    </option>
                                </select>
                            </div>
                            <hr className="my-2" />
                            <div className="entryy flex items-center justify-between">
                                <label htmlFor="date" className="text-lg">
                                    Date:
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <hr className="my-2" />
                            <div className="entryy flex items-center justify-between">
                                <label htmlFor="discount" className="text-lg">
                                    Discount %:
                                </label>
                                <input
                                    type="number"
                                    id="discount"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                    value={discount}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setDiscount(Number(e.target.value))}
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        <button
                            type="button"
                            onClick={addEntry}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Add Entry
                        </button>
                        <button
                            type="button"
                            onClick={generateInvoice}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Generate Invoice
                        </button>
                    </div>
                    <div></div>
                    <div
                        id="entries"
                        className="flex flex-col justify-center items-center mt-2 container mx-auto"
                    >
                        {entries.map((entry, index) => (
                            <div
                                key={index}
                                className="entry flex w-full justify-center items-center mt-2"
                            >
                                <select
                                    value={entry.design}
                                    onChange={(e) =>
                                        handleChangeEntry(
                                            index,
                                            'design',
                                            e.target.value
                                        )
                                    }
                                    className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                >
                                    <option value="">Select Design</option>
                                    {Object.keys(prices).map((designOption) => (
                                        <option
                                            key={designOption}
                                            value={designOption}
                                        >
                                            {designOption}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={entry.finish}
                                    onChange={(e) =>
                                        handleChangeEntry(
                                            index,
                                            'finish',
                                            e.target.value
                                        )
                                    }
                                    className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                >
                                    <option value="">Select Finish</option>
                                    {entry.design &&
                                        Object.keys(
                                            prices[entry.design] || {}
                                        ).map((finishOption) => (
                                            <option
                                                key={finishOption}
                                                value={finishOption}
                                            >
                                                {finishOption}
                                            </option>
                                        ))}
                                </select>

                                <input
                                    type="text"
                                    placeholder="Enter Area"
                                    value={entry.area}
                                    onChange={(e) =>
                                        handleChangeEntry(
                                            index,
                                            'area',
                                            e.target.value
                                        )
                                    }
                                    className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                />

                                <select
                                    value={entry.floor}
                                    onChange={(e) =>
                                        handleChangeEntry(
                                            index,
                                            'floor',
                                            e.target.value
                                        )
                                    }
                                    className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                >
                                    <option value="">Select Floor</option>
                                    {['BSMT', 'GF', 'FF', 'SF', 'TF'].map(
                                        (floor) => (
                                            <option key={floor} value={floor}>
                                                {floor}
                                            </option>
                                        )
                                    )}
                                </select>

                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={entry.qty}
                                    onChange={(e) =>
                                        handleChangeEntry(
                                            index,
                                            'qty',
                                            e.target.value
                                        )
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-60"
                                />
                                <RiDeleteBin6Fill
                                    onClick={() => removeEntry(index)}
                                    className="h-5 w-5 ml-2 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </form>

                <div
                    ref={invoiceRef}
                    className="container mx-auto max-w-7xl mt-10 px-10"
                >
                    <div className="flex justify-between">
                        <div>
                            <img
                                src={logoBlack}
                                className="w-[220px] mb-5"
                                alt="Logo"
                            />
                            <p className="text-lg mb-5">
                                Sunrooof Luminaries Pvt Ltd.
                            </p>
                            <p className="text-lg mb-5">
                                Plot No 3, Sector 8, IMT Manesar,
                            </p>
                            <p className="text-lg mb-5">
                                Gurgaon, Haryana - 122052
                            </p>
                        </div>
                        <div>
                            <img src={qr} alt="QR Code" className="w-[150px]" />
                            <a
                                href="https://www.sunrooof.com"
                                className="text-lg mb-5"
                            >
                                www.sunrooof.com
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold mb-4">Quotation</h3>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Client: </span>
                            {clientName}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Phone:</span>{' '}
                            {phoneNumber}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Email:</span> {email}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Site Address:</span>{' '}
                            {siteAddress}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Zone:</span> {zone}
                        </p>
                        <p className="text-lg mb-5">
                            <span className="font-bold">Date:</span> {date}
                        </p>
                        <table className="mt-5 flex flex-col container mx-auto max-w-7xl border border-black">
                            <thead className="flex w-full bg-[darkorange] py-2">
                                <tr className="flex items-start w-full px-2">
                                    <th className="mr-10">S.No</th>
                                    <th className="mr-28">Design and Finish</th>
                                    {/* <th>Finish</th> */}
                                    <th className="mr-24">Area</th>
                                    <th className="mr-20">Floor</th>
                                    <th className="mr-20">Quantity</th>
                                    <th className="mr-20">Unit Price</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody className="px-2">
                                {entries.map((entry, index) => {
                                    const price =
                                        prices[entry.design]?.[entry.finish] ||
                                        0
                                    const total = price * (entry.qty || 1)
                                    return (
                                        <tr key={index} className="flex w-full">
                                            <td className="text-center w-10 mr-10">
                                                {index + 1}
                                            </td>
                                            <td className="text-start w-60">
                                                {entry.design} {entry.finish}
                                            </td>
                                            {/* <td>{entry.finish}</td> */}
                                            <td className="w-32">
                                                {entry.area}
                                            </td>
                                            <td className="mr-20 text-center w-10">
                                                {entry.floor}
                                            </td>
                                            <td className="mr-20 text-center w-14">
                                                {entry.qty}
                                            </td>
                                            <td className="mr-20 text-center w-14">
                                                {entry.unitPrice}
                                            </td>
                                            <td className="mr-20 text-center w-14">
                                                {total.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="mt-10">
                            <h1 className="text-2xl font-bold mb-2">
                                Payment Terms
                            </h1>
                            {paymentTermsData.map((data) => {
                                return (
                                    <li
                                        className="text-lg mb-2 list-decimal"
                                        key={data.id}
                                    >
                                        {data.content}
                                    </li>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='container mx-auto max-w-7xl px-10 my-4'>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick={downloadInvoice}
                    >
                        Download Invoice
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvoiceGenerator
