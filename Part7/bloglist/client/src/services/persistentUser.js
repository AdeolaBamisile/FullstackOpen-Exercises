const key = 'loggedInUser'

export const getUser = () => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : null;
}
export const saveUser = (user) => {
    window.localStorage.setItem(key, JSON.stringify(user))
}
export const removeUser = () => {
    window.localStorage.removeItem(key)
}