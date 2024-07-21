"use client";
import { signout } from '@/helpers/auth'
import { Button } from './ui/button'

function SignOut() {
  return (
    <Button onClick={() => signout() } variant={"outline"}>Sign Out</Button>
  )
}

export default SignOut