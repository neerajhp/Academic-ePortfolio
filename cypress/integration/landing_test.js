describe('landing page', () => {
  
    it('login button redirects correctly', () => {
      cy.visit('http://localhost:3000')
      cy.contains("Login").click()
      //expect to redirect to login page
      cy.url().should('eq', 'http://localhost:3000/login')
    })

    it('signup button redirects correctly', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Create").click()
        //expect to redirect to signup page
        cy.url().should('eq', 'http://localhost:3000/signup')
    })
  })