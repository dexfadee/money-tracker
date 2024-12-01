"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
import { Separator } from "@/components/ui/separator"
import useRes from '@/lib/store'
import { set } from 'mongoose'

const formSchema = z.object({
    transactionfor: z.string().min(2).max(50),
    amount: z.string().min(1).max(1000000)
})

function AddTransactions() {

    const [addingTransaction, setAddingTransaction] = React.useState<boolean>(false);

    const { toast } = useToast();
    const resp: any = useRes((state: any) => state.changeRess)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            transactionfor: "",
            amount: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setAddingTransaction(true);
        const { transactionfor, amount } = values;

        const response = await axios.post('/api/add-transaction', { transactionfor: transactionfor.substring(1), amount, isPending: transactionfor.startsWith('~') ? true : false });

        resp(Math.random().toString());
        if (response.status === 200) {
            form.reset({ transactionfor: '', amount: '' });
            toast({
                title: "Transaction Added",
                description: "Transaction has been added successfully",
            })
        } else {
            toast({
                title: "Error",
                description: "Error adding transaction",
                variant: "destructive",
            })
        }
        setAddingTransaction(false);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:w-3/4 w-full mx-auto pt-6 px-6 flex flex-col gap-2">
                <h1 className='font-medium'>Add Transaction</h1>
                <Separator />
                <FormField
                    control={form.control}
                    name="transactionfor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Transaction For</FormLabel>
                            <FormControl>
                                <Input placeholder="Transaction For" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount (Negative for Expense)</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="Amount" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="isPending"
                    render={({ field }) => (
                        <FormItem className='items-center flex gap-2'>
                            <FormLabel>Is the transaction Completed?</FormLabel>
                            <FormControl className='flex w-full items-center'>
                                <ToggleGroup type="single" value={field.value} defaultValue='pending' onValueChange={field.onChange} className='flex flex-col md:flex-row'>
                                    <ToggleGroupItem value='completed' className='w-full md:w-1/2'>Completed</ToggleGroupItem>
                                    <ToggleGroupItem value='pending' className='w-full md:w-1/2'>Pending</ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit" className='w-full' disabled={addingTransaction}>
                    {
                        addingTransaction ? 'Adding Transaction...' : 'Add Transaction'
                    }
                </Button>
            </form>
        </Form>
    )
}

export default AddTransactions