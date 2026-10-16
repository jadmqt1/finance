import { useQuery } from '@tanstack/react-query'
import { listMesDemandes } from './api'

export const useMesDemandes = (top?: number) =>
  useQuery({ queryKey: ['demandes', top], queryFn: () => listMesDemandes(top) })
