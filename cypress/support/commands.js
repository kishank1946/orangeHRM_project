// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('before', (allreDir) => {
    let dir = allreDir+'/allure-results';
    try {
        if(fs.existsSync(dir)){
            fs.rmSync(dir,{recursive:true});
            console.log(`${dir} is deleted!`)
        }
    }catch(err){
        console.log('error while deleting this dir');
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
            console.log(`${dir} got created`)
        }
    }
});

Cypress.Commands.add('login', () => {
    const env = Cypress.env('Environment');
    cy.visit(Cypress.env('runner'))
    cy.url().should('include','opensource-demo.orangehrmlive.com')
    cy.get('.orangehrm-login-slot').click();
    cy.get('.oxd-input--active[name="username"]').type(Cypress.env(`${env}`).userName);
    cy.get('.oxd-input--active[name="password"]').type(Cypress.env(`staging`).password).type('{enter}');

    cy.url().should('include', '/dashboard');

    cy.getCookie('orangehrm').then((sessionCookie) => {
        if (sessionCookie) {
          cy.setCookie('orangehrm', sessionCookie.value);
        }
      });

})