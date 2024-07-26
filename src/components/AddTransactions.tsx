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
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    transactionfor: z.string().min(2).max(50),
    amount: z.string().min(1).max(1000000),
    isPending: z.union([
        z.literal('completed'),
        z.literal('pending')
    ])
})

function AddTransactions() {

    const { toast } = useToast();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { transactionfor, amount, isPending } = values;
        const response = await axios.post('/api/add-transaction', { transactionfor, amount, isPending,  });
        if (response.status === 200) {
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
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            transactionfor: "",
            amount: '',
            isPending: 'pending',
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:w-1/4 w-1/2 mx-auto pt-6">
            <h1 className='font-medium'>Add Transaction</h1>
            <Separator />
                <FormField
                    control={form.control}
                    name="transactionfor"
                    render={({ field }) => (
                        <FormItem>
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
                            <FormControl>
                                <Input placeholder="Amout (Enter Negative for expense)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isPending"
                    render={({ field }) => (
                        <FormItem className='items-center flex gap-2'>
                            <FormControl className='flex w-full items-center'>
                                <ToggleGroup type="single" value={field.value} defaultValue='pending' onValueChange={field.onChange} className='flex flex-col md:flex-row'>
                                    <ToggleGroupItem value='completed' className='w-full md:w-1/2'>Completed</ToggleGroupItem>
                                    <ToggleGroupItem value='pending' className='w-full md:w-1/2'>Pending</ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full'>Add Transaction</Button>
            </form>
        </Form>
    )
}

export default AddTransactions