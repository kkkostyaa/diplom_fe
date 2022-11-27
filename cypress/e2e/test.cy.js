///<reference types="cypress"/>
import { loginToCabinet } from '../support/accountActions';
import { newRegistration } from '../support/accountActions';
import userData from '../support/userData.json'
import { findBySearchFunc } from '../support/orderActions';
import { findProduct } from '../support/orderActions';
import { newOrder } from '../support/orderActions';
import { fillFeedback } from '../support/feedbackForm';


it.skip('Registration with faker.js', () => {
    cy.visit('/');
    cy.get('.close-dialog').click();
    cy.get('.cc-btn').click();

    //registration
    let newUser = newRegistration();

    //login
    loginToCabinet(newUser.email, newUser.password);
    
})

it.skip('Login with test user', () => {
    cy.visit('/');
    cy.get('.close-dialog').click();
    cy.get('.cc-btn').click();

    //login
    loginToCabinet(userData.username, userData.password);
    
})

it('Buy from search', () => {
    cy.visit('/');
    cy.get('.close-dialog').click();
    cy.get('.cc-btn').click();
    
    let newUser = newRegistration();
    loginToCabinet(newUser.email, newUser.password);

    findProduct('OWASP Juice Shop Mug');
    
    newOrder();

    fillFeedback();    
    
})