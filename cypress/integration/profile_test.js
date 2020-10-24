import 'cypress-react-selector'
import '@testing-library/cypress/add-commands';



describe('Profile Page', () => {
    beforeEach(() => {
      //login first 
      cy.visit('http://localhost:3000/home/login')

      //fill out the info and submit
      cy.get('input').eq(0).type('cartman@email.com')
      cy.get('input').eq(1).type('12345678')
      cy.get('button[type=submit]').eq(0).click()
      cy.url().should('eq', 'http://localhost:3000/myprofile')
      cy.wait(1000)

  })

    it('test logout', () => {
      
      //click the logout button
      cy.get('button').first().click()
      cy.url().should('eq', 'http://localhost:3000/home/login')

    })

    it('test access myaccount', () => {

      //click myaccount link
      cy.get('a[href*="/myaccount"]').click()
      cy.url().should('eq', 'http://localhost:3000/myaccount')

      //contains required headers 
      cy.findByRole('heading', { name: /Account information/i }).should('exist');
      cy.findByRole('heading', { name: /Update your Email/i }).should('exist');
      cy.findByRole('heading', { name: /Update your Password/i }).should('exist');
      cy.findByRole('heading', { name: /Personal information/i }).should('exist');
      cy.findByRole('heading', { name: /Profile Setting/i }).should('exist');



    })

    it('open education form', () => {

      //opening education form, need to test input boxes, adding rows  
      cy.findByTestId('education-form').click();
      cy.waitForReact();
      cy.getReact('EducationCard').getProps();
      cy.getReact('EducationDialog').getProps();

    })

    it('open bio form', () => {

      //opening bio form, need to test input 
      cy.waitForReact();
      cy.scrollTo(0, 0)
      cy.findByTestId('bio').click();
    })

    it('open employment form', () => {

      //opening employment form, need to test input boxes, adding rows 
      cy.waitForReact()
      cy.findByRole('dialog');
      cy.findByTestId('employment').scrollIntoView();
      cy.findByTestId('employment').click();
    })

    it('open volunteering form', () => {

      //opening volunteering form, need to test input boxes, adding rows 
      cy.waitForReact();
      cy.findByTestId('volunteering').click();
    })

    it('open extracurricular work form', () => {

      //opening extracurriuclar form, need to test input boxes, adding rows 
      cy.waitForReact();
      cy.findByTestId('extracurricular').click();
    })
  })

