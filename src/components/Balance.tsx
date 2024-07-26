'use client';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useToast } from './ui/use-toast';

function Balance() {
    const { toast } = useToast();

    const getBalance = async () => {
        try {
            const balance = await axios.get('/api/get-balance')
            setBalance(balance.data.balance)
            toast({
                title: "Success",
                description: "Balance Fetched Successfully",
                variant: "default",
            })
        } catch (error) {
            console.log("Error While fetching the get balance api, maybe error in database connnection");
            return 0;
        }
    }
    
    useEffect(() => {
        getBalance()
    }, [])

    const [balance, setBalance] = useState(0)
   
  return (
    <div className='flex flex-col gap-1 items-center pt-8 pb-4'>
        <h4 className='text-start text-lg font-semibold'>YOUR BALANCE</h4>
        <h1 className='text-5xl font-bold'>
            Rs. {balance}
        </h1>
        <span className='text-sm opacity-30'>(Only Completed Transactions are calculated)</span>
    </div>
  )
}

export default Balance