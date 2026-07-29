const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseURL)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const create = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseURL, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdotes')
    }

    return await response.json()
}

const edit = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(`${baseURL}/${anecdote.id}`, options)

    if (!response.ok) {
        throw new Error('Failed to edit anecdotes')
    }

    return await response.json()
}

export { getAll, create, edit }