describe('Register Page', () => {

    //need to implement a way to reset db each test 
    it('test valid signup', () => {
      cy.visit('http://localhost:3000/signup')

      cy.get('input').eq(0).type('Randy')
      cy.get('input').eq(1).type('Marsh')
      cy.get('input').eq(2).type('randy@email.com')
      cy.get('input').eq(3).type('aA@12345678')
      cy.get('input').eq(4).type('aA@12345678')
      cy.get('button').last().click()

      cy.get('button').click()
      cy.url().should('eq', 'http://localhost:3000/login')

    })

    it('test duplicate email signup', () => {
      cy.visit('http://localhost:3000/signup')

      cy.get('input').eq(0).type('Eric')
      cy.get('input').eq(1).type('Cartman')
      cy.get('input').eq(2).type('cartman@email.com')
      cy.get('input').eq(3).type('aA@12345678')
      cy.get('input').eq(4).type('aA@12345678')
      cy.get('button').last().click()
      cy.url().should('eq', 'http://localhost:3000/signup')

    })
  })