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

function TransactionList() {

    const resp = useRes((state: any) => state.res)
    const changeRess: any = useRes( (state: any) => state.changeRess )

    useEffect(() => {
        getTransactions()
    }, [resp])

    const [transactions, setTransactions] = useState<Array<{ _id: string, text: string, amount: number, isPending: string, user: string }>>([])

    const getTransactions = async () => {
        const res = await axios.get('/api/get-transactions')
        setTransactions(res.data.transactions);
    }

    const { toast } = useToast();
    console.log(transactions[0]?.isPending);
    
    return (
        <ScrollArea className="h-[calc(88vh-152px)] w-full rounded-md py-2 px-4 border border-gray-800">
            <h1 className="text-2xl text-center font-semibold pt-2">A list of your recent Transactions</h1>
            <Table className="px-4">
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
                        transactions.map((transaction: { _id: string, text: string, amount: number, isPending: string, user: string }) => (
                            <TableRow key={transaction._id} className={`bg-opacity-15` + (transaction.amount > 0 ? ` bg-green-600` : ` bg-red-600`)}>
                                <TableCell>{transaction.text}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell className="text-right">
                                    <AlertDialog>

                                        <AlertDialogTrigger disabled={!(transaction.isPending === 'true')} className="border border-gray-700 p-2 rounded-md px-4">
                                            {(transaction.isPending === 'true') ? "Pending" : "Completed"}
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
                                <TableCell className="text-right">
                                    <AlertDialog>

                                        <AlertDialogTrigger className="border border-gray-700 p-2 rounded-md px-4">
                                            Delete
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