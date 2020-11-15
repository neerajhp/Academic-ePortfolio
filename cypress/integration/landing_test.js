describe('landing page', () => {

    //test we can go to the login page 
    it('test we can go to the login page', () => {

      //check we are on the landing page
      cy.visit('http://localhost:3000')
      cy.url().should('eq', 'http://localhost:3000/home/landing')

      //click the login page button 
      cy.get('button').eq(0).click()

      // expect to redirect to login page
      cy.url().should('eq', 'http://localhost:3000/home/login')
    })

    it('test we can go to the signup page', () => {

      //check we are on the landing page
      cy.visit('http://localhost:3000')
      cy.url().should('eq', 'http://localhost:3000/home/landing')

      //click the login page button 
      cy.get('button').eq(0).click()

      // expect to redirect to login page
      cy.url().should('eq', 'http://localhost:3000/home/login')

      //click the signup page button
      cy.get('button').eq(1).click()

      cy.url().should('eq', 'http://localhost:3000/home/signup')

    })
    
    //test we can go to the signup page 
    it('signup button redirects correctly', () => {

        //check we are on the landing page
        cy.visit('http://localhost:3000')
        cy.url().should('eq', 'http://localhost:3000/home/landing')

        //click search page button
        cy.get('button').eq(1).click()

        //expect to redirect to search page
        cy.url().should('eq', 'http://localhost:3000/home/search')
    })
  })