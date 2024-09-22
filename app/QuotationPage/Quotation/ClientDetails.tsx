import {clientData} from './data' // Importing the JSON data from the file

const ClientDetails = () => {
    return (
        <div className="flex justify-between items-start w-full gap-4">
            <div className="flex flex-col gap-4">
                <p className="font-semibold">
                    <span className="font-bold">Client Name:</span>{' '}
                    {clientData.clientName}
                </p>
                <p>
                    <span className="font-bold">Mobile No.:</span>{' '}
                    {clientData.mobileNo}
                </p>
                <p>
                    <span className="font-bold">Email:</span>{' '}
                    {clientData.email || 'N/A'}
                </p>
                <p>
                    <span className="font-bold">Site Address:</span>{' '}
                    {clientData.siteAddress}
                </p>
                <p>
                    <span className="font-bold">Zone:</span>
                    <select className="ml-2 border border-gray-300 rounded-lg p-1">
                        <option>{clientData.zone}</option>
                    </select>
                </p>
            </div>
            <div>
                <p className="font-bold">
                    Date: <span className="font-normal">{clientData.date}</span>
                </p>
            </div>
        </div>
    )
}

export default ClientDetails
