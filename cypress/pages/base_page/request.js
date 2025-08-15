import Element from './element';
import Navigation from './navigation';

export default class Request {
  static requestApiWithBody(ambiente, body = [], method = 'POST') {
    return cy.request({
      method: method,
      url: ambiente,
      failOnStatusCode: false,
      body: body
    });
  }

  static http_request_with_body(method, endpoint, body, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) {
    return cy.request({
      method: method,
      url: endpoint,
      body: body,
      headers: headers,
      failOnStatusCode: failOnStatusCode,
      timeout: timeout,
      qs: qs
    });
  }

  static http_request_without_body(method, endpoint, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) {
    return cy.request({
      method: method,
      url: endpoint,
      headers: headers,
      failOnStatusCode: failOnStatusCode,
      timeout: timeout,
      qs: qs
    });
  }

  static send_header_ie(ie = 3) {        
    return {
      user_id: 99999,
      ie_id: ie
    };
  }

  static send_header_ie_by_name(ie) {       
    switch (ie) {
      case "PUCRS": return {user_id: 99999, ie_id: 3}; 
      case "FAAP": return {user_id: 99999, ie_id: 1}; 
      default: return {user_id: 99999, ie_id: 1}; 
    } 
  }

  static getUrl(){
    return cy.url({ timeout: Cypress.env('global_timeout')});
  }

  static explicitWait(seconds = 2000) {
    cy.wait(seconds);
  }

  static implicitWait(method = "GET", endpoint = "", alias = 'loadPageFirst') {
    cy.intercept({
      method: method,
      url: endpoint,
    }).as(alias);
  }

  static getWait(alias = '@loadPageFirst', status_esperado = 200, status_alternativo = 304, xtimeout = 50000) {
    if(!alias.includes('@')) alias = '@' + alias;
    const expectedStatuses = [status_esperado, 201, 202, 203, status_alternativo];

    return cy.wait(alias, { timeout: xtimeout })
      .its('response.statusCode')
      .then((status) => {
        cy.wrap(status)
          .should('be.oneOf', expectedStatuses, { 
            message: `Status Code incorreto. Request: "${alias}". Atual: ${status} - Esperado: ${expectedStatuses}.`
          });
      });
  }

  static waitUntilErrorNextStop(qtde_tentativas = 2, pass = false) {
    cy.log('...Remaining attempts: ' + qtde_tentativas);

    Element.getElement('body')
      .then(($body) => {
        if ($body.text().includes('client-side exception')) {
          Element.getElementText("h2")
            .then((txt) => {
              console.log(txt);
              if (qtde_tentativas == 0 && pass == false)
                throw 'Erro do next';

              if (txt.trim().includes('client-side exception') && pass == false) {
                console.log("entrou");
                Navigation.reloadPage();
                this.explicitWait(5000);
                this.waitUntilErrorNextStop(qtde_tentativas - 1, false);
              } else {
                pass = true;
                return "ok";
              }
            });
        } else {
          pass = true;
          return "ok";
        }
      });
  }
}