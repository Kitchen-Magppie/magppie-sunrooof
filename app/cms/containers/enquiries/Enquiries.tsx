import { useFirebaseConsultationListener } from '../../utils/firebase/customer'
import moment from "moment"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { IConsult } from '../../../../types/consultation'
import { useAppSelector } from '../../../../redux'
export default function Enquiries() {
    useFirebaseConsultationListener()
    const data = useAppSelector((state) => state.Cms.Consultations.value)
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="flex justify-center h-screen">
            <table className="my-auto border">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="border-b text-gray-800 uppercase"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 pr-2 py-4 font-medium text-left"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 pt-[14px] pb-[18px]"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div />
        </div>
    )
}
const columnHelper = createColumnHelper<IConsult>()

const columns = [
    columnHelper.accessor('id', {
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor('fullName', {
        cell: (info) => info.getValue(),
    }),
    // you can use different aproach here
    // columnHelper.accessor((row) => row.email, {
    //     id: 'email',
    //     cell: (info) => <i>{info.getValue()}</i>,
    //     header: () => <span>Email</span>,
    // }),
    columnHelper.accessor('mobile', {
        header: () => 'Phone',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('city', {
        header: () => 'City',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('budget', {
        header: () => 'Tentative Budget',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('at.created', {
        header: () => 'Created at',
        cell: (info) => moment(info.renderValue()).format('hh:mm A, DD/MM/Y'),
    }),
]
