import 'cypress-react-selector'
import '@testing-library/cypress/add-commands';


describe('Search page', () => {

    it('test if we can visit dummy profile', () => {

        //check we are on the landing page
        cy.visit('http://localhost:3000/home/search')

        //initialise react
        cy.waitForReact();
  
        //search for morty and check if a result is returned 
        cy.get('input').type('morty')
        cy.get('button').click()
        cy.get('button').click()
        cy.wait(500)
        cy.getReact('SearchCard')

  
      })
    //
    
    // //test we can go to the signup page 
    // it('signup button redirects correctly', () => {

    //     //check we are on the landing page
    //     cy.visit('http://localhost:3000')
    //     cy.url().should('eq', 'http://localhost:3000/home/landing')

    //     //click search page button
    //     cy.get('button').eq(1).click()

    //     //expect to redirect to search page
    //     cy.url().should('eq', 'http://localhost:3000/home/search')
    // })
  })