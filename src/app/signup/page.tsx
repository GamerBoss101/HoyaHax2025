import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  
  export default function SignupPage() {
    return (
      <SignedOut>
        <SignInButton />
      </SignedOut>
    )
  }