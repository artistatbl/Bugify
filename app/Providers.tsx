"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import {FC, ReactNode} from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

interface Props {
	children: ReactNode
}

const queryClient = new QueryClient()



const Providers: FC<Props>  = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
	 <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers

