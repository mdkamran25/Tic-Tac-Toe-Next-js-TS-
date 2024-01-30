import Header from '@/components/header/header'
import Signup from '@/components/signup/signup'
import React from 'react'

const SignupPage = () => {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-card-radius bg-card-primary py-5 ">
        <Header
          heading="Create new account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </div>
  )
}

export default SignupPage
