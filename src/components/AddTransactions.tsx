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
import { Checkbox } from "@/components/ui/checkbox"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const formSchema = z.object({
    transactionfor: z.string().min(2).max(50),
    amount: z.string().min(1).max(1000000),
    isPending: z.union([
        z.literal('completed'),
        z.literal('pending')
    ])
})

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
}

function AddTransactions() {

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-1/4">
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
                                <ToggleGroup type="single" value={field.value} defaultValue='pending' onValueChange={field.onChange}>
                                    <ToggleGroupItem value='completed' className='w-1/2'>Completed</ToggleGroupItem>
                                    <ToggleGroupItem value='pending' className='w-1/2'>Pending</ToggleGroupItem>
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