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

require('cypress-xpath');

import 'cypress-file-upload';

Cypress.Commands.add('stepNotImplemented', () => { 
  console.log('O step não foi implementado!');
  cy.log('O step não foi implementado!');
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('acessar_dominio_externo', (site, sent_args = {}) => {
  return cy.origin(site, { args: sent_args }, ({ sent_args }) => {
    cy.visit('/');
  });
});

const COMMAND_DELAY_CLICK = 300;
Cypress.Commands.overwrite('click', (originalFn, ...args) => {
  const origVal = originalFn(...args);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(origVal);
    }, COMMAND_DELAY_CLICK);
  });
});

Cypress.Commands.overwrite('should', (originalFn, actual, assertion, ...args) => {
  // Verifica se a última parte dos argumentos é um objeto de opções que contém uma mensagem
  const options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
  
  if (options.message) {
    const listener = (error, runnable) => {
      error.message = options.message;
      error.name = 'CustomError: ';
      throw error; // Re-lança o erro para falhar o teste com a nova mensagem
    };

    const removeListener = () => {
      cy.removeListener('fail', listener);
      cy.removeListener('command:end', removeListener);
    };

    cy.on('fail', listener);
    cy.on('command:end', removeListener);
  }

  // Executa o comando original com os argumentos restantes
  return originalFn(actual, assertion, ...args);
});