import { faker } from '@faker-js/faker';

export function newOrder() {

let user = {
    country: faker.address.country(),
    firstName: faker.name.firstName(),
    phoneNumber: faker.phone.number('##########'),
    postcode: faker.address.zipCode('#####'),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    card: faker.finance.creditCardNumber('446#############')
    }

    
    //click on toolbar  
    cy.log('start ordering');
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted').click();
    cy.get('#checkoutButton').click();
    cy.get('div.ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper > span').click();

    //fill user adress
    cy.log('fill address form');
    cy.get('.mat-form-field.ng-tns-c119-25 > .mat-form-field-wrapper').type(user.country);
    cy.get('.mat-form-field.ng-tns-c119-26 > .mat-form-field-wrapper').type(user.firstName);
    cy.get('.mat-form-field.ng-tns-c119-27 > .mat-form-field-wrapper').type(user.phoneNumber);
    cy.get('.mat-form-field.ng-tns-c119-28 > .mat-form-field-wrapper').type(user.postcode);
    cy.get('.mat-form-field.ng-tns-c119-29 > .mat-form-field-wrapper').type(user.street);
    cy.get('.mat-form-field.ng-tns-c119-30 > .mat-form-field-wrapper').type(user.city);
    cy.get('.mat-form-field.ng-tns-c119-31 > .mat-form-field-wrapper').type(user.state);

    cy.get('#submitButton').click();

    cy.log('set delivery options');
    cy.get(':nth-child(2) > .cdk-column-Selection').click();
    cy.get('.btn-next').click();
    cy.get(':nth-child(4) > .cdk-column-Selection').click();
    cy.get('.nextButton').click();

    //credit card input
    cy.log('add credit card');
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click();
    cy.get('.mat-form-field.ng-tns-c119-35 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type(user.firstName);
    cy.get('.mat-form-field.ng-tns-c119-36 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type(user.card);
    cy.get('#mat-input-18').select(8);
    cy.get('#mat-input-19').select(8);

    cy.get('#submitButton').click();
    
    cy.wait(2000);
    
    cy.get('.mat-radio-inner-circle').click();
    cy.get('.nextButton').click();
    cy.get('#checkoutButton').click();
}


export function findBySearchFunc(searchQuery) {
    cy.log('search product with default site search');

    cy.get('.mat-search_icon-search').click();
    cy.get('.mat-search_field').type(searchQuery + '{enter}');

    cy.get('[style="display: flex; justify-content: center;"] > .mat-focus-indicator').click();
}

export function findProduct(productName) {
    cy.log('search product by checking items on each page');
    cy.get('body').then(body => {
        if (body.find(`div.item-name:contains(" ${productName} ")`).length > 0) {
            cy.get(`div.item-name:contains(" ${productName} ")`).parents('div .mat-grid-tile-content').within(() => {
                cy.get('[aria-label="Add to Basket"]').click()})

            } else {
                if (body.find('[aria-label="Next page"][disabled="true"]').length > 0) {
                    return cy.log('Product not found');
                        } else {
                        cy.get('[aria-label="Next page"]').click()
                        }
                        findProduct(productName)
                    }
            }
        )
    }