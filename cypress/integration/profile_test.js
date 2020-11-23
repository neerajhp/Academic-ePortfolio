import "cypress-react-selector";
import "@testing-library/cypress/add-commands";
import 'cypress-file-upload';


describe("Profile Page", () => {
  beforeEach(() => {
    //login first
    cy.visit("http://localhost:3000/home/login");

    //fill out the info and submit
    cy.get("input").eq(0).type("polochiu23@gmail.com");
    cy.get("input").eq(1).type("zxZX12345678!");
    cy.get("button[type=submit]").eq(0).click();
    cy.url().should("eq", "http://localhost:3000/myprofile");
    cy.wait(1000);
    cy.waitForReact();

  });

  it("test logout", () => {
    //click the logout button
    cy.get("button").first().click();
    cy.url().should("eq", "http://localhost:3000/home/login");
  });

  it("test access myaccount", () => {
    //click myaccount link
    cy.get('a[href*="/myaccount"]').click();
    cy.url().should("eq", "http://localhost:3000/myaccount");

    //contains required headers
    cy.findByRole("heading", { name: /Account information/i }).should("exist");
    cy.findByRole("heading", { name: /Update your Email/i }).should("exist");
    cy.findByRole("heading", { name: /Update your Password/i }).should("exist");
    cy.findByRole("heading", { name: /Personal information/i }).should("exist");
    cy.findByRole("heading", { name: /Profile Setting/i }).should("exist");
  });

  it("test employment form", () => {
    //opening employment form, update, check and delete 

    cy.findByRole('button', { name: /Add Employment Experience/}).click({force: true});
    cy.findByRole('button', { name: /Add an experience/}).click();
    cy.get('input').eq(1).type("Something inc");
    cy.get('input').eq(2).type("Some role");
    cy.findByRole('button', { name: /Update/}).click();

    cy.wait(2000);

    cy.findAllByRole('row', { name: "Jan, 2020 -Dec, 2020 Something inc Some role ,"}).should("exist");
    cy.get('button').eq(3).click({force: true});
    cy.findByRole('button', { name: ""}).click()

  });

  it("test volunteering form", () => {
    //opening volunteering form, update, check and delete 

    cy.findByRole('button', { name: /Add Volunteering Experience/}).click({force: true});
    cy.findByRole('button', { name: /Add an experience/}).click();
    cy.get('input').eq(1).type("Something inc");
    cy.get('input').eq(2).type("Some role");
    cy.findByRole('button', { name: /Update/}).click();

    cy.wait(2000);

    cy.findAllByRole('row', { name: "Jan, 2020 -Dec, 2020 Something inc Some role ,"}).should("exist");
    cy.get('button').eq(4).click({force: true});
    cy.findByRole('button', { name: ""}).click()

  });

  it("test extracurricular form", () => {
    //opening extracurricular form, update, check and delete 

    cy.findByRole('button', { name: /Add Extracurricular Experience/}).click({force: true});
    cy.findByRole('button', { name: /Add an experience/}).click();
    cy.get('input').eq(1).type("Something inc");
    cy.get('input').eq(2).type("Some role");
    cy.findByRole('button', { name: /Update/}).click();

    cy.wait(2000);

    cy.findAllByRole('row', { name: "Jan, 2020 -Dec, 2020 Something inc Some role ,"}).should("exist");
    cy.get('button').eq(5).click({force: true});
    cy.findByRole('button', { name: ""}).click()

  });


  it("test education form", () => {
    //opening education form, update, check and delete 
    
    cy.findByRole('button', { name: /Add Your Education/i}).click();
    cy.findByRole('button', { name: /Add a school/i}).click();
    cy.react('FormEduSelect').click();
    cy.findByRole('option', { name: /University/i}).click();
    cy.get('input').eq(2).type("University Of Melbourne");
    cy.get('input').eq(3).type("Data Science");
    cy.findByRole('button', { name: /Update/}).click();
    cy.wait(5000);

    cy.findAllByRole('row', { name: "Jan, 2020 -Dec, 2020 University Of Melbourne Data Science"}).should("exist");

    cy.get('button').eq(6).click();
    cy.findByRole('button', { name: ""}).click();

  });

  it("test reflection form", () => {
    //opening reflection form, update, check and delete

    cy.findByRole("button", { name: "My Reflections"}).click();
    cy.findByRole("button", { name: "Add Your Reflection"}).click({force:true});
    cy.findByRole("button", { name: "Add a Reflection"}).click({force:true});
    cy.get("input")
    cy.findAllByRole("textbox").eq(0).type("some blog title")
    cy.findAllByRole("textbox").eq(1).type("some blog content")
    cy.findByRole("button", { name: "Update"}).click({force: true});

    cy.findAllByRole('row', { name: "some blog title some blog content"}).should("exist");

    cy.get("button").eq(1)
    cy.get("button").eq(2)
    cy.get("button").eq(9).click({force:true})
    cy.findByRole("button", { name: ""}).click()
    cy.wait(2000);
    
  });

  it("test bio form", () => {
    //opening reflection form, update, check and delete

    cy.get('button').eq(2).click({force:true});
    cy.findByRole("textbox", { name: "" }).type('bio content');
    cy.findByRole('button', { name: /Update/}).click();
    cy.wait(3000);
    cy.contains("bio content");

    cy.get('button').eq(2).click({force:true});

    cy.findByRole("textbox", { name: "" }).clear();
    cy.findByRole('button', { name: /Update/}).click();

  });

  it('Testing picture uploading', () => {
    cy.fixture('morty-dumb-face.jpeg').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'morty-dumb-face.jpeg',
            mimeType: 'image/jpeg'
        });
  });
});



});
