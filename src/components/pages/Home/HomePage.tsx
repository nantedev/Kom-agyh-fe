import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

import HomeHeading from '@/components/pages/Home/HomeHeading'
import { Button } from '@/components/ui/button'
import PageLayout from '@/components/ui/PageLayout'
import { networkErrorMessage } from '@/data/auth'
import { homeContent } from '@/data/home'
import { getSession, signOut } from '@/lib/api/auth'
import { extractApiError } from '@/lib/api/http'
import { queryKeys } from '@/lib/api/queryKeys'
import { composeArrivalToast, type AuthOrigin } from '@/logic/auth/toast/toast'

type ArrivalLocationState = {
  arrival?: AuthOrigin
} | null

export default function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { actions } = homeContent

  const { data: session, isPending: isSessionPending } = useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession,
  })

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.session, null)
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session })
      toast.error(extractApiError(error)?.message ?? networkErrorMessage)
    },
  })

  const userName = session?.user.name
  const arrival = (location.state as ArrivalLocationState)?.arrival

  useEffect(() => {
    if (!arrival || !userName) {
      return
    }

    toast.success(composeArrivalToast(arrival, userName), {
      id: `arrival-${arrival}`,
    })
    navigate(location.pathname, { replace: true, state: null })
  }, [arrival, userName, location.pathname, navigate])

  const navBarActions = isSessionPending ? null : userName === undefined ? (
    <>
      <Button
        variant="outline"
        size="navBar"
        nativeButton={false}
        render={<Link to="/signin" />}
      >
        {actions.signIn}
      </Button>
      <Button
        size="navBar"
        nativeButton={false}
        render={<Link to="/signup" />}
      >
        {actions.signUp}
      </Button>
    </>
  ) : (
    <Button
      variant="ghost"
      size="navBar"
      disabled={signOutMutation.isPending}
      onClick={() => signOutMutation.mutate()}
    >
      <LogOutIcon aria-hidden />
      {actions.signOut}
    </Button>
  )

  return (
    <PageLayout navBarActions={navBarActions}>
      {!isSessionPending && <HomeHeading userName={userName} />}
    </PageLayout>
  )
}
