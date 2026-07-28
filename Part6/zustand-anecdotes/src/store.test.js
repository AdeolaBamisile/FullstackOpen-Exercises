import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions} from "./store";
import ServerAnecdotes from "./services/ServerAnecdotes";
import { expect } from "vitest";

vi.mock('./services/ServerAnecdotes', ({
    default: {
        getAll: vi.fn(),
        create: vi.fn(),
        edit: vi.fn(),
        remove: vi.fn()
    }
}))

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '', notification: null })
    vi.clearAllMocks()
})

describe('useAnecdoteStore', () => {
    it ('initialize returns all anecdotes in server', async () => {
        const mockAnecdote = [{ id: 1, content: 'Testing', votes: 0 }]
        ServerAnecdotes.getAll.mockResolvedValue(mockAnecdote)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual(mockAnecdote)
    })

    it ('anecdotes displayed from server are sorted by votes', async () => {
        const anecdotes = [
            { id: 1, content: 'Testing', votes: 1 },
            { id: 2, content: 'Testing 2', votes: 2 }
        ]
        useAnecdoteStore.setState({ anecdotes })
        ServerAnecdotes.getAll.mockResolvedValue(anecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current[0].content).toBe('Testing 2')
    })

    it ('anecdotes are properly filtered', async () => {
        const anecdotes = [
            { id: 1, content: 'Testing', votes: 1 },
            { id: 2, content: 'Zustand tests', votes: 2 },
            { id: 3, content: 'Less than Redux', votes: 2 }
        ]

        useAnecdoteStore.setState({anecdotes})
        ServerAnecdotes.getAll.mockResolvedValue(anecdotes[2])

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.setFilter('Redux')
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toHaveLength(1)
    })

    it ('voting increases he number of votes for an anecdote', async () => {
        const anecdote = { id: 1, content: 'Testing', votes: 0 }
        useAnecdoteStore.setState({ anecdotes: [anecdote] })
        ServerAnecdotes.edit.mockResolvedValue({ ...anecdote, votes: 1 })

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.vote(1)
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current[0].votes).toBe(1)

    })
})