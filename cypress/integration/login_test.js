describe('Login Page', () => {

  
    it('test valid login', () => {
      cy.visit('http://localhost:3000/login')

      //fill out the info and submit
      cy.get('input').eq(0).type('cartman@email.com')
      cy.get('input').eq(1).type('12345678')
      cy.get('button[type=submit]').eq(0).click()

      cy.url().should('eq', 'http://localhost:3000/myprofile')

    })

    it('test invalid email login', () => {


        cy.visit('http://localhost:3000/login')

        cy.get('input').eq(0).type('ccartmann@email.com')
        cy.get('input').eq(1).type('12345678')
        cy.get('button[type=submit]').eq(0).click()
        
        cy.url().should('eq', 'http://localhost:3000/home/login')
  
      })

      it('test invalid password login', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input').eq(0).type('cartman@email.com')
        cy.get('input').eq(1).type('123456789')
        cy.get('button[type=submit]').eq(0).click()

        cy.url().should('eq', 'http://localhost:3000/home/login')
  
      })

    it('test Signup link', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('button').eq(1).click()
        cy.url().should('eq', 'http://localhost:3000/home/signup')
    })

    //need to find a way to test url of new tabs 
    // it('test google signin link', () => {
    //   cy.visit('http://localhost:3000/login')
    //   cy.get('button').eq(2).contain('Google')

    // })

    // it('test facebook signin link', () => {
    //   cy.visit('http://localhost:3000/login')
    //   cy.get('button').eq(3).contain('Facebook')

    // })
  })

