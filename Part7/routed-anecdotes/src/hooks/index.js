import { useEffect, useState } from "react"
import AnecdoteServices from "../services/anecdotes"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = event => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        value,
        onChange,
        type,
        reset
    }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        AnecdoteServices.getAll().then(initialAnecdotes => {
            setAnecdotes(initialAnecdotes)
        })
    }, [])

    const addAnecdote = async (newAnecdote) => {
        const savedAnecdote = await AnecdoteServices.createNew(newAnecdote)
        setAnecdotes(anecdotes.concat(savedAnecdote))
    }

    const deleteAnecdote = async (id) => {
        await AnecdoteServices.remove(id)
        setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}