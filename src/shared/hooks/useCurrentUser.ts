import { getContext } from '@microsoft/power-apps/app'
import { useQuery } from '@tanstack/react-query'

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => (await getContext()).user,
    staleTime: Infinity,
    retry: false,
  })
