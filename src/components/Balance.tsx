'use client';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useRes from '@/lib/store'

function Balance() {

    const [balance, setBalance] = useState(0)
    const resp = useRes( (state :any) => state.res)

    const getBalance = async () => {
        try {
            const balance = await axios.get('/api/get-balance')
            setBalance(balance.data.balance)
        } catch (error) {
            console.log("Error While fetching the get balance api, maybe error in database connnection");
            return 0;
        }
    }
    
    useEffect(() => {
        getBalance()
    }, [resp])

  return (
    <div className='flex flex-col gap-1 items-center pt-8 pb-4'>
        <h4 className='text-start text-lg font-semibold'>YOUR BALANCE</h4>
        <h1 className='text-5xl font-bold'>
            Rs. {balance}
        </h1>
    </div>
  )
}

export default Balance