const { test, beforeEach, describe, expect } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'Ola',
                name: 'Adeola',
                password: 'secret'
            }
        })
        await request.post('/api/users', {
            data: {
                username: 'Ade',
                name: 'AdeolaB',
                password: 'sekret'
            }
        })

        await page.goto('/')
    })

    // test('Login form is shown', async ({ page }) => {
    //     await expect(page.getByText('login to application')).toBeVisible()
    //     await expect(page.getByLabel('username')).toBeVisible()
    //     await expect(page.getByLabel('password')).toBeVisible()
    // })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'Ola', 'secret')

            await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'wrong username', 'wrong password')

            await expect(page.getByText('wrong username or password')).toBeVisible()
            await expect(page.getByRole('button', {name: 'logout'})).not.toBeVisible()
        })

        describe('when logged in', () => {
            beforeEach(async ({ page }) => {
                await loginWith(page, 'Ola', 'secret')
            })

            test('a new blog can be created', async ({ page }) => {
                await createBlog(page, 'new Title', 'new Author', 'new Url')
                
                await expect(page.getByText('new Title new Author')).toBeVisible()
            })

            describe('and a blog exist', () => {
                beforeEach(async ({ page }) => {
                    await createBlog(page, 'new Title', 'new Author', 'new Url')
                })

                test('a new blog can be liked', async ({ page }) => {
                    await page.getByText('new Title new Author').click()
                    await page.getByRole('button', { name: 'like' }).click()
                
                    await expect(page.getByText('likes: 1')).toBeVisible()
                })

                test('a blog can be deleted', async ({ page }) => {
                    await page.getByText('new Title new Author').click()
                    await page.getByRole('button', { name: 'remove' }).click()

                    await expect(page.getByText('new Title new Author')).not.toBeVisible()
                })

                // test('only the user who added the blog sees the delete button', async ({ page }) => {
                //     await page.getByRole('button', { name: 'log out' }).click()
                //     await loginWith(page, 'Ade', 'sekret')
                //     await page.getByRole('button', { name: 'view' }).click()

                //     await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
                // })
            })
            // describe('and several blogs exist', () => {
            //     beforeEach(async ({ page }) => {
            //         await createBlog(page, 'new Title 1', 'new Author 1', 'new Url 1')
            //         await createBlog(page, 'new Title 2', 'new Author 2', 'new Url 2')
            //         await createBlog(page, 'new Title 3', 'new Author 3', 'new Url 3')
            //     })

                // test('blogs are arranged in the order of most likes first', async ({ page }) => {
                //     const blog3View = page.locator('.titleAndAuthor').filter({ hasText: 'new Title 3' }).getByRole('button', { name: 'view' })
                //     const blog1View = page.locator('.titleAndAuthor').filter({ hasText: 'new Title 1' }).getByRole('button', { name: 'view' })

                //     await blog3View.click()
                //     await page.getByRole('button', { name: 'like' }).click()
                //     await page.getByText('likes 1').waitFor()
                //     await page.getByRole('button', { name: 'like' }).click()
                //     await page.getByText('likes 2').waitFor()

                //     await blog1View.click()
                //     await page.getByRole('button', { name: 'like' }).click()
                //     await page.getByText('likes 1').waitFor()

                //     const titleAuthor = page.locator('.titleAndAuthor')

                //     await expect(titleAuthor.nth(0)).toContainText('new Title 3 new Author 3')
                //     await expect(titleAuthor.nth(1)).toContainText('new Title 1 new Author 1')
                //     await expect(titleAuthor.nth(2)).toContainText('new Title 2 new Author 2')
                // })
            // })
        })
    })
})