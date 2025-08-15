import Element from './element';
import Request from './request';

export default class Interaction extends Element {
  static clickElement(elementID, index = undefined, scroll = undefined) {
    this.getElement(elementID, index, scroll).as('el');
    return cy.get('@el').click({force: true});
  }

  static clickElementByText(text, index = undefined, caseSensitive = false) {
    this.getElementByContainsText(text, index, caseSensitive).click({force: true});
  }

  static clickElementByAlternativeText(text, text2 = undefined, index = undefined, scroll = false) {
    Request.explicitWait();
    this.getElement('body', index, scroll)
      .then(($body) => {
        if ($body.text().includes(text))
          this.getElementByContainsText(text).click({force: true});
        else {
          if(text2 != undefined)
            this.getElementByContainsText(text2).click({force: true});
        }
      });
  }

  static clickElementByFind(elementID, finder = undefined, index = undefined, scroll = undefined, indexFinder = undefined) {
    this.getElementByFind(elementID, finder, index, scroll, indexFinder).as('el');
    cy.get('@el').click({force: true});
  }

  static clickElementFilterByVisible(elementID, index = undefined) {
    this.getElementFilterVisible(elementID, index).as('el');
    cy.get('@el').click({force: true});
  }

  static clickElementCheckBox(elementID, option, index = undefined, scroll = true) {
    this.getElement(elementID, index, scroll)
      .check(option, { force: true })
      .should('be.checked', {message: `Campo checkbox não está marcado. Identificador: ` + elementID});
  }

  static clickElementByExistText(validate_text, element1, element2) {
    this.getElement('body', false).then(($body) => {
      if ($body.text().includes(validate_text))
        this.clickElement(element1);
      else
        this.clickElement(element2);
    });
  }

  static clickElementByShadowAndFind(element, position = 0, find = null, p2 = 0){
    return this.getElement(element, position)
      .shadow()
      .find(find)
      .eq(p2)
      .click({force: true});
  }

  static typeElement(elementID, text, index = undefined, scroll = undefined, opt_delay = 10) {
    this.getElement(elementID, index, scroll).type(text, { force: true, delay: opt_delay });
  }

  static typelLastElement(elementID, text, index = undefined, scroll = undefined, opt_delay = 10) {
    this.getLastElement(elementID, index, scroll).type(text, { force: true, delay: opt_delay });
  }

  static typeElementByFind(elementID, finder = undefined, index = undefined, scroll = undefined) {
    this.getElementByFind(elementID, finder, index, scroll).type(text, { force: true });
  }

  static clearElementInput(elementID, index = undefined, scroll = undefined) {
    this.getElement(elementID, index, scroll).clear();
  }

  static typeAndBlurElement(element, text, index = undefined, scroll = undefined) {
    this.getElement(element, index, scroll).type(text).blur();
  }

  static clearElementAndType(element, text, index = undefined, scroll = undefined) {
    this.clearElementInput(element, index, scroll);
    Request.explicitWait();
    this.typeElement(element, text, index, scroll);
  }

  static selectOption(element, option, index = undefined, scrollIntoView = false) {
    return this.getElement(element, index, scrollIntoView).select(option);
  }

  static selectRandomOption(element, index = undefined, scrollIntoView = false) {
    this.getElement(element, index, scrollIntoView)
      .find("option")
      .its("length")
      .then((optionsLength) => {
        const random_option = Math.floor(Math.random() * optionsLength);
        if(random_option == 0) random_option += 1;
        this.getElement(element).select(random_option);
      });
  }

  static checkRadioOption(element, value, scrollIntoView = false) {
    return this.getElement(element, scrollIntoView).check(value);
  }

  static hoverElement(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).trigger("mouseover");
  }

  static doubleClickElement(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).dblclick({force: true});
  }
}