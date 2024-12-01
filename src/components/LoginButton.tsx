"use client"
import React from 'react'
import { Button } from './ui/button'
import { signin } from '@/helpers/auth'
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle'

function LoginButton() {
  const [loading, setLoading] = React.useState(false)
  return (
    <Button onClick={() => {
      setLoading(true);
      signin("google")
      setLoading(false);
    } } className='flex gap-2'>
      {
        loading? 'Loading...' : (
          <>
            <FaGoogle />
            <span>Sign in with Google</span>
          </>
        )
      }
    </Button>
  )
}

export default LoginButton