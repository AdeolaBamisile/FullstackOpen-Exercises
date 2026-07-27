const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseURL)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotess')
    }

    return await response.json()
}

const create = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(baseURL, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

const edit = async (id, anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(`${baseURL}/${id}`, options)

    if (!response.ok) {
        throw new Error('Failed to update note')
    }

    return await response.json()
}

const remove = async (id) => {
    const response = await fetch(`${baseURL}/${id}`, { method: 'DELETE' })

    if (!response.ok) {
        throw new Error('Failed to delete note')
    }

    return await response.ok
}

export default { getAll, create, edit, remove }