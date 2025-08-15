import Element from './element';

export default class Navigation extends Element {
  static visit(path = "", timeout = 90000) {
    cy.visit(path, { timeout: timeout });
  }

  static reloadPage() {
    cy.reload();
  }

  static scrollIntoView(elementID, index = undefined) {
    this.getElement(elementID, index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static scrollToBottomOfElement(elementID, index = undefined) {
    this.getElement(elementID, index).scrollTo('bottom');
  }

  static scrollToTopOfElement(elementID, index = undefined) {
    this.getElement(elementID, index).scrollTo('top');
  }
}
