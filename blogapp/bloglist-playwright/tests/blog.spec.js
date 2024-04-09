const { test, describe, expect, beforeEach } = require('@playwright/test')
//npx playwright codegen http://localhost:5173/
describe('Blog app initializes', async() => {
  beforeEach(async({page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'marinaul',
        name: 'marinaul',
        password: 'marinaul'
      },
    })
    await page.goto('http://localhost:5173/')
  })

  test('login form can be displayed', async ({ page }) => {
    await page.getByRole('button', { name: 'log-in' }).click();
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  test('login in with valid user works', async({page}) => {
    await page.getByRole('button', { name: 'log-in' }).click();
    await page.locator('input[name="Username"]').fill('marinaul');
    await page.locator('input[name="Password"]').fill('marinaul');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('marinaul logged in')).toBeVisible()
  })
  
  test('login with wrong credentials', async({page}) => {
    await page.getByRole('button', { name: 'log-in' }).click();
    await page.locator('input[name="Username"]').fill('marinaulasd');
    await page.locator('input[name="Password"]').fill('marinaulasdss');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('marinaul logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async({page}) => {
      await page.getByRole('button', { name: 'log-in' }).click();
      await page.locator('input[name="Username"]').fill('marinaul');
      await page.locator('input[name="Password"]').fill('marinaul');
      await page.getByRole('button', { name: 'login' }).click();
    })

    test('you can create a blog', async({page}) => {
      await page.getByRole('button', { name: 'new blog' }).click();
      await page.getByPlaceholder('title').fill('marinei');
      await page.getByPlaceholder('author').fill('marinei');
      await page.getByPlaceholder('url').fill('marinei');
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.locator('.blog').filter({ hasText: 'marinei view' })).toBeVisible();
    })

    describe('when there is a blog already', () => {
      beforeEach(async({page}) => {
        await page.getByRole('button', { name: 'new blog' }).click();
        await page.getByPlaceholder('title').fill('marinei');
        await page.getByPlaceholder('author').fill('marinei');
        await page.getByPlaceholder('url').fill('marinei');
        await page.getByRole('button', { name: 'create' }).click();
      })

      test('blogs can be edited (adding a like)', async({page}) => {
        await page.getByRole('button', { name: 'view' }).first().click();
        await expect(page.getByText('likes: 0 like')).toBeVisible();
        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('likes: 1 like')).toBeVisible();
      })

      test('it is possible to delete a blog', async({page})=> {
        await page.getByRole('button', { name: 'view' }).click();
        await expect(page.getByRole('button', { name: 'delete' })).toBeVisible();
        await expect(page.locator('.blog').filter({ hasText: 'marinei hide' })).toBeVisible();
        await page.getByRole('button', { name: 'delete' }).click();
        await expect(page.locator('.blog').filter({ hasText: 'marinei hide' })).not.toBeVisible();
      })

      describe('when there are multiple users registered', () => {
        beforeEach(async({page, request}) => {
          await request.post('http://localhost:3003/api/users', {
            data: {
              username: 'gymnast',
              name: 'gymnast',
              password: 'gymnast'
            },
          })
        })

        test('one cannot delete anothers blog + logout works', async({page}) => {
          await page.getByRole('button', { name: 'view' }).click();
          await expect(page.getByRole('button', { name: 'delete' })).toBeVisible();
          await page.getByRole('button', { name: 'logout' }).click();
          await page.getByRole('button', { name: 'log-in' }).click();
          await page.locator('input[name="Username"]').fill('gymnast');
          await page.locator('input[name="Password"]').fill('gymnast');
          await page.getByRole('button', { name: 'login' }).click();
          await page.getByRole('button', { name: 'view' }).click();
          await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible();
        })
        
        test('blogs are displayed in order of likes', async({page}) => {
          await page.getByPlaceholder('title').fill('gymnast');
          await page.getByPlaceholder('author').fill('gymnast');
          await page.getByPlaceholder('url').fill('gymnast');
          await page.getByRole('button', { name: 'create' }).click();
          await page.getByText('gymnast view').waitFor()
          
          const blogs = await page.locator('.blog div').all()
          const blog1 = await blogs[0].textContent()
          const blog2 = await blogs[1].textContent()


          await page.locator('p').filter({ hasText: 'marinei view' }).getByRole('button').click();
          await page.getByRole('button', { name: 'view' }).click();
          await page.getByRole('button', { name: 'like' }).nth(1).click();
          await page.locator('p').filter({ hasText: 'title: gymnast hide' }).getByRole('button').click();
          await page.getByRole('button', { name: 'hide' }).click();

          const blogsLater = await page.locator('.blog div').all()
          const blogLater1 = await blogsLater[0].textContent()
          const blogLater2 = await blogsLater[1].textContent()

          expect(blog1).toBe(blogLater2);
          expect(blog2).toBe(blogLater1);

      
          
        
        
        
        
        
        
        
        
        })
        

      })
    })
  })
})