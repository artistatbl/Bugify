'use client'
import { Button } from '@/components/components/ui/button'
import { OrganizationSubscriptionSchema } from '@/app/validationSchemas'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { useToast } from '../../lib/hooks/use-toast'
import { useCustomToasts } from '../../lib/hooks/use-custom-toasts'

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  organizationId: string
  organizationName: string
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  organizationId,
  organizationName,
}: SubscribeLeaveToggleProps) => {
  const { toast } = useToast()
  const { loginToast } = useCustomToasts()
  const router = useRouter()

  const { mutate: subscribe } = useMutation({
    mutationFn: async () => {
      const payload: OrganizationSubscriptionSchema = {
        organizationSlug: organizationName,
      }

      const { data } = await axios.post('/api/ground/subscribe', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'There was a problem.',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
      toast({
        title: 'Subscribed!',
        description: `You are now subscribed to r/${ organizationName}.`,
      })
    },
  })

  const { mutate: unsubscribe} = useMutation({
    mutationFn: async () => {
      const payload: OrganizationSubscriptionSchema = {
        organizationSlug: organizationName,
      }

      const { data } = await axios.post('/api/ground/unsubscribe', payload)
      return data as string
    },
    onError: (err: AxiosError) => {
      toast({
        title: 'Error',
        description: err.response?.data as string,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
      toast({
        title: 'Unsubscribed!',
        description: `You are now unsubscribed from/${organizationName}.`,
      })
    },
  })

  return isSubscribed ? (
    <Button
      className='w-full mt-1 mb-4 bg-white text-black dark:bg-black dark:text-white'
     // isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}>
      Leave community
    </Button>
  ) : (
    <Button
      className='w-full mt-1 mb-4 bg-white text-black dark:bg-black dark:text-white'
      //isLoading={isSubLoading}
      onClick={() => subscribe()}>
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle