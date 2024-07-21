"use client"
import React from 'react'
import { Button } from './ui/button'
import { signin } from '@/helpers/auth'

function SignIn() {
  return (
    <Button onClick={() => signin("google") } variant={"outline"}>Sign In</Button>
  )
}

export default SignIn