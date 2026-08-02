import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

test("Blog info and likes are displayed to unauthorised users", async () => {
    const blog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'www.newUrl.com',
        likes: 10,
        user: {
            username: "New User",
            name: 'newUser'
        }
    }

    const { container } = render(
        <MemoryRouter>
            <Blog blog={blog} user={null}/>
        </MemoryRouter>
    )

    const AuthorAndTitle = container.querySelector('.AuthorAndTitle')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')
    const removeButton = container.querySelector('.removeButton')
    const likeButton = container.querySelector('.likeButton')

    expect(AuthorAndTitle).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(removeButton).not.toBeVisible()
    expect(likeButton).toBeNull()
})

test("Authorised users who are not the blog's creator are shown like button only", async () => {
    const blog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'www.newUrl.com',
        likes: 10,
        user: {
            name: 'newUser',
            username: "New user"
        }
    }

    const loggedInUser = {
        name: 'differentUser',
        username: "Different User"
    }

    const { container } = render(
        <MemoryRouter>
            <Blog blog={blog} user={loggedInUser}/>
        </MemoryRouter>
    )

    const removeButton = container.querySelector('.removeButton')
    const likeButton = container.querySelector('.likeButton')

    expect(removeButton).not.toBeVisible()
    expect(likeButton).toBeVisible()
})

test("blog's creator can see remove button", async () => {
    const blog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'www.newUrl.com',
        likes: 10,
        user: {
            name: 'newUser',
            username: "New user"
        }
    }

    const { container } = render(
        <MemoryRouter>
            <Blog blog={blog} user={blog.user}/>
        </MemoryRouter>
    )

    const removeButton = container.querySelector('.removeButton')
    const likeButton = container.querySelector('.likeButton')

    expect(removeButton).toBeVisible()
    expect(likeButton).toBeVisible()
})
