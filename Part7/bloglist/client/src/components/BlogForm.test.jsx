import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { expect, test, vi } from "vitest";

test('form calls event handler recieved as props with the right details when blog is created', async () => {
    const user = userEvent.setup()
    const mockEvent = vi.fn()

    render(<BlogForm createBlog={mockEvent} />)
    
    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('url')
    
    const button = screen.getByText('create')

    await user.type(title, 'newTitle')
    await user.type(author, 'newAuthor')
    await user.type(url, 'www.newUrl.com')
    await user.click(button)

    expect(mockEvent.mock.calls).toHaveLength(1)
    expect(mockEvent.mock.calls[0][0].title).toBe('newTitle')
    expect(mockEvent.mock.calls[0][0].author).toBe('newAuthor')
    expect(mockEvent.mock.calls[0][0].url).toBe('www.newUrl.com')
})