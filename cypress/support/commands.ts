/// <reference types="cypress" />
import faker from 'faker';

Cypress.Commands.add('compareText', (element, expectedValue): any =>
  element
    .invoke('text')
    .invoke('replace', /\u00a0/g, ' ')
    .invoke('replace', '*', '')
    .invoke('trim')
    .should('eq', expectedValue),
);

Cypress.Commands.add(
  'iframe', // @ts-ignore
  { prevSubject: 'element' },
  ($iframe) => new Cypress.Promise((resolve) => $iframe.on('load', () => resolve($iframe.contents().find('body')))),
);
Cypress.Commands.add('typeRandom', { prevSubject: 'element' }, (element, text, type, length): any => {
  const random = '_RANDOM_';
  if (text.indexOf(random) > -1 || ['format'].indexOf(type || '') > -1) {
    switch (type) {
      case 'number':
        text = text.replace(random, faker.finance.account(length).toString());
        break;
      case 'words':
        text = text.replace(random, faker.random.words(length));
        break;
      case 'email':
        text = text.replace(random, faker.internet.email().toLowerCase());
        break;
      case 'format':
        text = faker.helpers.replaceSymbols(text);
        break;
      default:
        text = text.replace(random, faker.random.word());
        break;
    }
  }
  cy.wrap(element).clear().type(text);
});
