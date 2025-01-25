import {
    SignInButton,
    SignedOut,
  } from '@clerk/nextjs'
  
  export default function SignupPage() {
    return (
      <SignedOut>
        <SignInButton />
      </SignedOut>
    )
  }