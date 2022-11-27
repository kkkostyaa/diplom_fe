
import { faker } from '@faker-js/faker';
let stringMath = require('string-math');

export function fillFeedback() {
    cy.log('open feedback form');

    cy.get('[routerlink="/search"]').click();
    cy.get('[aria-label="Open Sidenav"]').click();
    cy.get('[routerlink="/contact"] > .mat-list-item-content').click();


    cy.log('fill feedback form')
    cy.get('#comment').type(faker.random.words(15));
    cy.get('#rating').type('4');
   
    cy.get('#captcha').then(($el) => {
        const question = $el.text();
        cy.get('#captchaControl').type(stringMath(question))
    });

    cy.get('#submitButton').click();
}