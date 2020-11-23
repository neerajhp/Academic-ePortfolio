import 'cypress-react-selector'
import '@testing-library/cypress/add-commands';


describe('Search page', () => {

    it('test if we can search dummy profile', () => {

        //check we are on the landing page
        cy.visit('http://localhost:3000/home/search')

        //initialise react
        cy.waitForReact();
  
        //search for morty and check if a result is returned 
        cy.get('input').type('morty')
        cy.get('button').click()
        cy.get('button').click()
        cy.wait(500)
        cy.findByRole('heading', { name: 'morty smith'}).should('exist')

  
      })

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
        cy.findByRole('heading', { name: 'morty smith'}).click()
        cy.url().should("eq", "http://localhost:3000/view/polochiu23");
    
  
      })

      it('test login link', () => {

        //check we are on the landing page
        cy.visit('http://localhost:3000/home/search')
        
        //initialise react
        cy.waitForReact();
  
        //search for morty and check if a result is returned 
        cy.findByRole('link', { name: 'Login'}).click()
        cy.url().should("eq", "http://localhost:3000/home/login");
    
  
      })


    
  })