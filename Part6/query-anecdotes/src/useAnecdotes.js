import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create, edit, getAll } from './requests'

const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: edit,
    onSuccess: (returnedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => 
        anecdote.id === returnedAnecdote.id ? returnedAnecdote : anecdote
      ))
    }
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError : result.isError,
    vote: (anecdote) => voteMutation.mutate(anecdote),
    addAnecdote: (anecdote) => newAnecdoteMutation.mutate(anecdote)
  }

}

export { useAnecdotes }