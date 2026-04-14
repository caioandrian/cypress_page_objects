import Request from './request';
import Elements from './elements';

export default class Navigation{
  static visit(path = "", timeout = 40000) {
    cy.visit(path, { timeout: timeout, retryOnStatusCodeFailure: true });
  }

  static reloadPage() {
    cy.reload();
  }

  static scrollIntoView(elementID, index = undefined) {
    Elements.getElement(elementID, index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static scrollToBottomOfElement(elementID, index = undefined) {
    Elements.getElement(elementID, index).scrollTo('bottom');
  }

  static scrollToTopOfElement(elementID, index = undefined) {
    Elements.getElement(elementID, index).scrollTo('top');
  }

  static visit_preprod(path = "", ie) {
    var codigo_ie;

    switch (ie) {
      case "PUCRS":codigo_ie = Cypress.env("codigo_acesso").pucrs; break;
      case "FAAP":codigo_ie = Cypress.env("codigo_acesso").faap; break;
      case "UNINASSAU":codigo_ie = Cypress.env("codigo_acesso").uninassau; break;
      case "SCSP":codigo_ie = Cypress.env("codigo_acesso").scsp; break;
      case "IMPACTA":codigo_ie = Cypress.env("codigo_acesso").impacta; break;
      default: break;
    }

    Request.implicitWait('GET', path, 'loadPagina');

    cy.visit(path, {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns(codigo_ie);
      }});

    Request.getWait('@loadPagina');
  }
}


