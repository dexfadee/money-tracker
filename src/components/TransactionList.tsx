'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useRes from "@/lib/store";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

function CheckMark() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    )
}

function LoadingArrows() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    )
}

function DeleteButton() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}

function TransactionList() {

    const resp = useRes((state: any) => state.res)
    const changeRess: any = useRes((state: any) => state.changeRess)
    const [filterPending, setFilterPending] = useState<boolean>(false)

    const [transactions, setTransactions] = useState<Array<{ _id: string, text: string, amount: number, isPending: boolean, user: string }>>([])

    const [filteredTransactions, setFilteredTransactions] = useState<Array<{ _id: string, text: string, amount: number, isPending: boolean, user: string }>>([])

    useEffect(() => {
        getTransactions()
    }, [resp])

    useEffect(() => {
        if (transactions.length === 0) {
            getTransactions()
        }
        if (filterPending) {
            setFilteredTransactions(transactions.filter(transaction => transaction.isPending.toString() === 'true'));
        }
    }, [filterPending])

    const getTransactions = async () => {
        const res = await axios.get('/api/get-transactions')
        setTransactions(res.data.transactions);
    }

    const { toast } = useToast();

    return (
        <ScrollArea className="h-[calc(88vh-152px)] w-full rounded-md py-2 px-4 border border-gray-800">
            <div className="flex justify-between">
                <h1 className="text-2xl text-center font-semibold pt-2">A list of your recent Transactions</h1>
                <Button onClick={() => setFilterPending(!filterPending)} className="w-[20%] mt-2 break-words">{filterPending ? 'All' : 'Pending'}</Button>
            </div>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>For</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Delete?</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        (filterPending ? filteredTransactions : transactions).map((transaction: { _id: string, text: string, amount: number, isPending: boolean, user: string }) => (
                            <TableRow key={transaction._id} className={`bg-opacity-15` + (transaction.amount > 0 ? ` bg-green-600` : ` bg-red-600`)}>
                                <TableCell className="w-1/4">{transaction.text}</TableCell>
                                <TableCell className="w-1/4">{transaction.amount}</TableCell>
                                <TableCell className="text-right w-1/4">
                                    <AlertDialog>

                                        <AlertDialogTrigger disabled={!(transaction.isPending.toString() === 'true')} className="border border-gray-700 rounded-md px-2 py-1">
                                            {(transaction.isPending.toString() === 'true') ? <LoadingArrows /> : <CheckMark />}
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will change the pending status to completed and cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>

                                                <AlertDialogCancel onClick={() => { return }}>
                                                    Cancel
                                                </AlertDialogCancel>

                                                <AlertDialogAction onClick={async () => {
                                                    const res = await axios.post('/api/toggle-pending', { id: transaction._id })
                                                    changeRess(Math.random().toString())
                                                    toast({
                                                        title: "Transaction Status Changed",
                                                        description: "Transaction status has been changed successfully",
                                                    })
                                                }}>
                                                    Continue
                                                </AlertDialogAction>

                                            </AlertDialogFooter>

                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                                <TableCell className="text-center md:text-right w-1/4">
                                    <AlertDialog>

                                        <AlertDialogTrigger className="border border-gray-700 py-1 rounded-md px-2">
                                            <DeleteButton />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>

                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete this transaction
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>

                                                <AlertDialogCancel onClick={() => { return }}>
                                                    Cancel
                                                </AlertDialogCancel>

                                                <AlertDialogAction onClick={async () => {
                                                    const res = await axios.post('/api/delete-transaction', { id: transaction._id })
                                                    changeRess(Math.random().toString())
                                                    toast({
                                                        title: "Transaction Deleted",
                                                        description: "Transaction has been deleted successfully",
                                                    })
                                                }}>
                                                    Continue
                                                </AlertDialogAction>

                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </ScrollArea>
    )
}

export default TransactionList