import { expect, test } from '@playwright/test'

//Test login using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/login')
   //await page.getByText('Login').click();
   await page.getByLabel('Email').fill('silvester@weebhood.com')
   await page.getByLabel('Password').fill('silvester')
   await page.getByText('login').click()
})

//Test register using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/register')
   await page.getByLabel('Username').fill('testUser')
   await page.getByLabel('Email').fill('Test@Gmail.com')
   await page.getByLabel('Password').fill('testPassword')
   await page.getByText('Register').click()
})

//Test logout using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/logout')
})

//Test book using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/book')
   await page.getByLabel('movie_title').fill('testMovie')
   await page.getByLabel('movie_description').fill('testDescription')
   await page.getByLabel('movie_genre').fill('testGenre')
   await page.getByText('Book').click()
})

//Test delete using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/delete')
   await page.getByText('Delete').click()
})

//Test viewing biodata using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/biodata')
   await page.getByText('View').click()
})

//Test downloading biodata using playwright
test('index page has expected h1', async ({ page }) => {
   await page.goto('http://localhost:5173/biodata')
   await page.getByText('Download').click()
})
