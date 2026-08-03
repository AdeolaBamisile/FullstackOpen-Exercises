import { create } from "zustand";
import blogServices from './services/blogs'
import loginServices from './services/login'
import { getUser, saveUser, removeUser  } from './services/persistentUser'
import userServices from "./services/users";

let timeout = null

const useNotificationStore = create(set => ({
    message: null,
    actions: {
        notify: message => {
            if (timeout) {
                clearTimeout(timeout)
            }

            set(state => ({ message }))

            timeout = setTimeout(() => {
                set(state => ({ message: null }))
            }, 5000)
        }
    }
}))

const useBlogsStore = create((set, get) => ({
    blogs: null,
    actions: {
        initialize: async () => {
            const blogs = await blogServices.getAll()
            set(state => ({ blogs }))
        },
        addBlog: async (blog, user) => {
            const newBlog = await blogServices.create(blog)
            const blogToAdd = { ...newBlog, user }
            set(state => ({ blogs: state.blogs.concat(blogToAdd) }))
        },
        likeBlog: async (blogId) => {
            const blog = get().blogs.find(blog => blog.id === blogId)
            const likedBlog = { ...blog, likes: blog.likes + 1 }
            const returnedBlog = await blogServices.edit(blogId, likedBlog)
            const returnedBlogWithUser = { ...returnedBlog, user: blog.user }

            set(state => ({
                blogs: state.blogs.map(blog => 
                    blog.id === blogId ? returnedBlogWithUser : blog
                )
            }))
        },
        deleteBlog: async (blogId) => {
            await blogServices.remove(blogId)
            set(state => ({
                blogs: state.blogs.filter(blog => blog.id !== blogId)
            }))
        },
        addComment: async (id, comment) => {
            const returnedBlog = await blogServices.editComment(id, comment)

            set(state => ({
                blogs: state.blogs.map(blog => 
                    blog.id === id ? returnedBlog : blog
                )
            }))
        }
    }
}))

const useUserStore = create(set => ({
    user: null,
    actions: {
        loginUser: async (userInfo) => {
            const user = await loginServices.login(userInfo)
            blogServices.setToken(user.token)
            saveUser(user)
            set(state => ({ user }))
        },
        logoutUser: () => {
            removeUser()
            blogServices.setToken(null)
            set(state => ({ user: null }))
        },
        setUser: () => {
            const user = getUser()
            if (user) {
                blogServices.setToken(user.token)
                set(state => ({ user }))
            }
        }
    }
}))

const useUsersStore = create(set => ({
    users: [],
    actions: {
        getUsers: async () => {
            const users = await userServices.getUsers()
            set(state => ({ users }))
        }
    }
}))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
export const useBlogs = () => useBlogsStore(state => state.blogs)
export const useBlogsActions = () => useBlogsStore(state => state.actions)
export const useUser = () => useUserStore(state => state.user)
export const useUserActions = () => useUserStore(state => state.actions)
export const useUsers = () => useUsersStore(state => state.users)
export const useUsersActions = () => useUsersStore(state => state.actions)
