import { faker } from '@faker-js/faker';

export function loginToCabinet(username, password) {
    cy.log('login wth ' + username);
    cy.get('#navbarAccount').click();
    cy.get('#navbarLoginButton').click();
    
    cy.get('#email').type(username);
    cy.get('#password').type(password);
    cy.get('#loginButton').click();

    cy.get('#navbarAccount').click();
    cy.get('.mat-menu-content > [aria-label="Go to user profile"]').should('contain.text', username);
    cy.get('.cdk-overlay-backdrop').click();  
}
 

export function newRegistration() {

let user = {
    email: faker.internet.email(),
    postcode: faker.address.zipCode(),
    password: 'Qwerty-1'
    }

    cy.log('create new user');

    cy.get('#navbarAccount').click();
    cy.get('#navbarLoginButton').click();

    cy.get('#newCustomerLink').click();
    cy.get('#emailControl').type(user.email);
    cy.get('#passwordControl').type(user.password);
    cy.get('#repeatPasswordControl').type(user.password);

    cy.get('.mat-select-arrow').click();
    cy.get('#mat-option-11').click();
    cy.get('#securityAnswerControl').type(user.postcode);
    cy.get('#registerButton').click();

    cy.log('user ' + user.email + ' created');
    return user;
}