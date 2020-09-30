describe('Login Page', () => {

  
    it('test valid login', () => {
      cy.visit('http://localhost:3000/login')

      //fill out the info and submit
      cy.get('input').first().type('cartman@email.com')
      cy.get('input').last().type('12345678')
      cy.get('button[type=submit]').last().click()
      
      cy.url().should('eq', 'http://localhost:3000/profile')

    })

    it('test invalid email login', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input').first().type('eric@email.com')
        cy.get('input').last().type('12345678')
        cy.get('button[type=submit]').last().click()
        cy.url().should('eq', 'http://localhost:3000/login')
  
      })

      it('test invalid password login', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input').first().type('cartman@email.com')
        cy.get('input').last().type('123456789')
        cy.get('button[type=submit]').last().click()
        cy.url().should('eq', 'http://localhost:3000/login')
  
      })

    it('test Signup link', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Sign Up').click()
        cy.url().should('eq', 'http://localhost:3000/signup')
    })
  })

