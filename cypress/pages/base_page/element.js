export default class Element {
  static extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  static countPropertyOccurrencesInsideArray(arr, property) {
    let count = 0;
    
    function countInObject(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === property) {
            count++;
          }
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            countInObject(obj[key]);
          }
        }
      }
    }
    
    for (const item of arr) {
      countInObject(item);
    }
    
    return count;
  }
  static get(value = "") {
    return cy.get(value);
  }

  static getElementByShadow(element, position = 0) {
    return this.getElement(element, position)
      .shadow();
  }

  static getElementByShadowAndFind(element, position = 0, find = null, p2 = 0) {
    return this.getElement(element, position)
      .shadow()
      .find(find)
      .eq(p2);
  }

  static getElementWithoutIndex(elementID, scroll = true) {
    if(elementID.includes("//")) {
      if(scroll)
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') });
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') });
    }
  }

  static getElement(elementID, index = 0, scroll = true) {
    if(elementID.includes("//")) {
      if(scroll)
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).eq(index);
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index);
    }
  }

  static getLastElement(elementID, scroll = true) {
    if(elementID.includes("//")) {            
      if(scroll)
        return cy.xpath("(" + elementID + ") [last()]", { timeout: Cypress.env('global_timeout') }).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.xpath("(" + elementID + ") [last()]", { timeout: Cypress.env('global_timeout') });
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).last().scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).last();
    }
  }

  static getElementText(element, index = undefined, scroll = undefined) {
    return this.getElement(element, index, scroll).should('be.visible').invoke('text');
  }

  static getElementTextFilterVisible(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll, { timeout: Cypress.env('global_timeout') })
      .scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }})
      .invoke('text');
  }

  static getElementFilterVisible(elementID, index = 0, scroll = true) {
    if(elementID.includes("//")) {
      if(scroll)
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index);
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index);
    }
  }

  static getElementByContainsText(text, index = 0, caseSensitive = false) {
    return cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: caseSensitive })
      .eq(index)
      .scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static getElementByFind(elementID, finder, index = undefined, scroll = undefined, indexFinder = 0) {
    return this.getElement(elementID, index, scroll)
      .find(finder, { timeout: Cypress.env('global_timeout') })
      .eq(indexFinder)
      .scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static getElementTextByFind(elementID, finder, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll)
      .find(finder)
      .should('be.visible')
      .invoke('text');
  }

  static getElementTextBySiblingsAndFinder(elementID, index = undefined, finder, indexFinder = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll)
      .find(finder)
      .siblings()
      .eq(indexFinder)
      .invoke('text');
  }

  static getElementFilterByContainsText(elementID, text, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll)
      .contains(text)
      .scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static getElementByInvokeText(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).invoke("text");
  }

  static getElementLength(elementID, index = undefined, scroll = false) {
    return this.getElement(elementID, index, scroll).its('length');
  }

  static getElementArrayLength(elementID) {
    return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).its('length');
  }

  static getElementLengthByFinder(elementID, finder, index = undefined, scroll = false) {
    return this.getElement(elementID, index, scroll).find(finder).its('length');
  }

  static getElementAttribute(elementID, attr = 'href', index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).invoke('attr', attr);
  }

  static getElementBySiblingsAndFinder(elementID, index = undefined, finder, indexFinder = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll)
      .find(finder)
      .siblings()
      .eq(indexFinder);
  }

  static getElementByFinderAndSiblingsAndParent(elementID, index = undefined, finder = "div", indexFinder = undefined, lastFinder = "div", lastIndex = 0, scroll = undefined) {
    return this.getElement(elementID, index, scroll)
      .find(finder)
      .siblings()
      .parent()
      .eq(indexFinder)
      .find(lastFinder)
      .eq(lastIndex);
  }

  static getElementValue(element, index = undefined, scroll = undefined, visible = true) {
    if(visible) {
      return this.getElement(element, index, scroll).should('be.visible').invoke('val');
    } else {
      return this.getElement(element, index, scroll).invoke('val');
    }
  }

  static elementForceShow(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).invoke("show");
  }

  static elementForceRemove(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).invoke("remove");
  }

  static elementChangeAttribute(elementLink, attr, value) {
    this.getElement(elementLink)
      .invoke('attr', attr, value)
      .should('have.attr', attr, value);
  }

  static sendKey(text, opt_delay = 10) {
    this.getElement('body').type('{' + text + '}', { force: true, delay: opt_delay});
  }

  static sendKeyToElement(elementID, text, index = undefined, scroll = undefined, opt_delay = 10) {
    this.getElement(elementID, index, scroll).type('{' + text + '}', { force: true, delay: opt_delay});
  }

  static conditionalJavascriptElementFound(element){
    return cy.document()
      .then( (doc) => {
        if(element.includes("//")){
          const e = doc.evaluate(element, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          if(e){
            cy.log("O elemento existe");
            return cy.wrap(true);
          }else{
            cy.log("O elemento não existe");
            return cy.wrap(false);
          }
        }else{
          const e = doc.querySelector(element);

          if(e){
            cy.log("O elemento existe");
            return cy.wrap(true);
          }else{
            cy.log("O elemento não existe");
            return cy.wrap(false);
          }
        }
      });
  }

  static countPropertyOccurrencesInsideArray(arr, property) {
    let count = 0;
    
    function countInObject(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === property) {
            count++;
          }
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            countInObject(obj[key]);
          }
        }
      }
    }
    
    for (const item of arr) {
      countInObject(item);
    }
    
    return count;
  }
}