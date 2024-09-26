import dayjs from 'dayjs'
import { TCustomerComponentQuotationItem } from '../../../types'
// import { clientData } from './data' // Importing the JSON data from the file

const ClientDetails = (props: TProps) => {
    return (
        <div className="flex justify-between items-start w-full gap-4">
            <div className="flex flex-col gap-4">
                <p className="font-semibold">
                    <span className="font-bold">Client Name:</span>{' '}
                    {/* {clientData.clientName} */}
                    {props.item.data.name}
                </p>
                <p>
                    <span className="font-bold">Mobile No.:</span>{' '}
                    {/* {clientData.mobileNo} */}
                    {props.item.data.mobile}

                </p>
                <p>
                    <span className="font-bold">Email:</span>{' '}
                    {props.item.data.email}

                    {/* {clientData.email || 'N/A'} */}
                </p>
                <p>
                    <span className="font-bold">Site Address:</span>{' '}
                    {/* {clientData.siteAddress} */}
                    {props.item.data.address}

                </p>
                <p>
                    <span className="font-bold">Zone:</span>
                    <select className="ml-2 border border-gray-300 rounded-lg p-1">
                        <option>
                            {props.item.data.zone}

                        </option>
                    </select>
                </p>
            </div>
            <div>
                <p className="font-bold">
                    Date: <span className="font-normal">{dayjs(props.item.data.createdDate).format('DD-MMM-YY')}</span>
                </p>
            </div>
        </div>
    )
}

export default ClientDetails
type TProps = { item: TCustomerComponentQuotationItem }
