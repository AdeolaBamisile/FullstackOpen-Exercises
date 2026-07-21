import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect, test, vi } from "vitest";

test("renders blog's title and author intially", async () => {
    const blog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'www.newUrl.com',
        likes: 10,
        user: {
            name: 'newUser'
        }
    }

    const { container } = render(<Blog blog={blog}/>)

    const titleAndAuthor = container.querySelector('.titleAndAuthor')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(titleAndAuthor).toBeVisible()
    expect(url).toBeNull()
    expect(likes).toBeNull()
})

test("blog' URL and number of likes are shown on button click", async () => {
    const blog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'www.newUrl.com',
        likes: 10,
        user: {
            name: 'newUser'
        }
    }

    const { container } = render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
})

test('if like button is clicked twice, the component recieved as props is called twice', async () => {
    const blog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'www.newUrl.com',
        likes: 10,
        user: {
            name: 'newUser'
        }
    }
    
    const user = userEvent.setup()
    const mockEvent = vi.fn()

    const { container } = render(<Blog blog={blog} handleLike={mockEvent} />)

    const viewButton = container.querySelector('.viewButton')
    await user.click(viewButton)

    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockEvent.mock.calls).toHaveLength(2)
})