import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children}: AuthLayoutProps) => {
  return (
    <div className='flex justify-center py-8'>{children}</div>
  )
}

export default AuthLayout