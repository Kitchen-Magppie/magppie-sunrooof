import dayjs from 'dayjs'
import { TCustomerComponentQuotationItem } from '../../../types'
// import { clientData } from './data' // Importing the JSON data from the file

const ClientDetails = (props: TProps) => {
    return (
        <div className="flex justify-between items-start w-full gap-4 container mx-auto">
            <div className="flex flex-col gap-4">
                <p className="text-xl">
                    <span className="font-bold">Client Name: </span>
                    {props.name}
                </p>
                <p className="text-xl">
                    <span>Mobile No.:</span> {/* {clientData.mobileNo} */}
                    {props.item.data.mobile}
                </p>
                <p className="text-xl">
                    <span>Email:</span> {props.item.data.email}
                    {/* {clientData.email || 'N/A'} */}
                </p>
                <p className="text-xl">
                    <span>Site Address:</span> {/* {clientData.siteAddress} */}
                    {props.item.data.address}
                </p>
                <p className="text-xl">
                    <span>Zone:</span>
                    <span className="ml-2 text-xl">{props.item.data.zone}</span>
                </p>
            </div>
            <div>
                <p className=" text-xl">
                    Date:{' '}
                    <span className="font-normal">
                        {dayjs(props.item.data.createdDate).format('DD-MMM-YY')}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ClientDetails
type TProps = { name: string; item: TCustomerComponentQuotationItem }
