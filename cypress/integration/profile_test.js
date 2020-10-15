describe('Profile Page', () => {
    beforeEach(() => {
      //login first 
      cy.visit('http://localhost:3000/home/login')

      //fill out the info and submit
      cy.get('input').eq(0).type('cartman@email.com')
      cy.get('input').eq(1).type('12345678')
      cy.get('button[type=submit]').eq(0).click()
      cy.url().should('eq', 'http://localhost:3000/myprofile')
      cy.wait(500)

  })

    it('test logout', () => {
      
      //click the logout button
      cy.get('button').first().click()
      cy.url().should('eq', 'http://localhost:3000/home/login')

    })

    it('test access myaccount', () => {
      cy.get('a[href*="/myaccount"]').click()
      cy.url().should('eq', 'http://localhost:3000/myaccount')

    })

    it('test education form', () => {
      cy.wait(500)
      
      //clikcing on the button on the professional work row
      cy.get('button').eq(3).click()

    })
  })

