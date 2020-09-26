describe('Register Page', () => {

  
    it('test valid signup', () => {
      cy.visit('http://localhost:3000/signup')

      //fill out the info and submit
    //   cy.get('input').first().type('Eric')
      cy.get('input').each()
      cy.get('input').last().type('aA@12345678{enter}')
      
      cy.contains('FirstName').debug().click()


      cy.get('input.form').type('Cartman')
      cy.get('input[name=email').type('cartman@email.com')
      cy.get('input[name=password').type('aA@12345678')
      cy.get('input[name=confirmPassword').type('aA@12345678{enter}')

      cy.contains('firstName').click().type('Eric')
      cy.get('input[name=lastName').type('Cartman')
      cy.get('input[name=email').type('cartman@email.com')
      cy.get('input[name=password').type('aA@12345678')
      cy.get('input[name=confirmPassword').type('aA@12345678{enter}')

      cy.contains('Click').click()
      cy.url().should('eq', 'http://localhost:3000')

    })
  })