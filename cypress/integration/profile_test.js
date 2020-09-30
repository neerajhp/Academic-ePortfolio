describe('Profile Page', () => {

  
    it('test logout', () => {
      
      //login first 
      cy.visit('http://localhost:3000/login')
      cy.get('input').first().type('cartman@email.com')
      cy.get('input').last().type('12345678')
      cy.get('button[type=submit]').click()
      cy.url().should('eq', 'http://localhost:3000/profile')

      //click the logout button
      cy.get('button').first().click()
      cy.url().should('eq', 'http://localhost:3000')

    })
  })

