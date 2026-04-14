import Navigation from './navigation';
import Elements from './elements';

export default class Request{
  static requestApiWithBody(ambiente, body = [], method = 'POST') {
    return cy.request({
      method: method,
      url:ambiente,
      failOnStatusCode: false,
      body: body
    });
  }

  static http_request_with_body(method, endpoint, body, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
    return cy.request({
      method: method,
      url: endpoint,
      body: body,
      headers: headers,
      failOnStatusCode: failOnStatusCode,
      timeout: timeout,
      qs : qs
    });
  }

  static http_request_without_body(method, endpoint, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
    return cy.request({
      method: method,
      url: endpoint,
      headers : headers,
      failOnStatusCode: failOnStatusCode,
      timeout: timeout,
      qs : qs
    });
  }

  static send_header_ie(ie = 3){        
    return {
      user_id: 99999,
      ie_id: ie
    };
  }

  static send_header_ie_by_name(ie){       
    switch (ie) {
    case "PUCRS": return {user_id: 99999,ie_id: 3}; break;
    case "FAAP": return {user_id: 99999,ie_id: 1}; break;
    case "UNINASSAU": return {user_id: 99999,ie_id: 2}; break;
    case "IMPACTA": return {user_id: 99999,ie_id: 8}; break;
    case "SIRIO": return {user_id: 99999,ie_id: 9}; break;
    default:return {user_id: 99999,ie_id: 1}; break;
    } 
  }

  static getUrl(){
    return cy.url({ timeout: Cypress.env('global_timeout')}).then((url) => {
      return url;
    });
  }

  static explicitWait(seconds = 2000){
    cy.wait(seconds);
  }

  static implicitWait(method = "GET", endpoint = "", alias='loadPageFirst'){
    cy.intercept({
      method: method,
      url: endpoint,
    }).as(alias);
  }

  static getWait(alias='@loadPageFirst', status_esperado = 200, status_alternativo=(304,307), xtimeout = 50000){
    if(!alias.includes('@')) alias = '@' + alias;

    return cy.wait(alias, { timeout: xtimeout })
    .then((interception) => {
      const res = interception.response;
      const statusCode = interception.response.statusCode;
      const expectedStatuses = [status_esperado, 201, 202, 203, status_alternativo];

      if (!expectedStatuses.includes(statusCode)) {
        if (res.body.hasOwnProperty('message')) {
          cy.log(`Mensagem de erro: ${res.body.message}`);
        } else if (res.body.hasOwnProperty('error')) {
          cy.log(`Mensagem de erro: ${res.body.error.message}`);
        }

        expect(statusCode, `Request: "${alias}. Status code esperado: ${expectedStatuses}, recebido: ${statusCode}. ${res.body.hasOwnProperty('message') ? `Mensagem de erro: ${res.body.message}` : res.body.hasOwnProperty('error') ? `Mensagem de erro: ${res.body.error.message}` : ''}`).to.equal(expectedStatuses);
      }
      
      expect(statusCode).to.be.oneOf(expectedStatuses, `Request: "${alias}". Atual: ${statusCode} - Esperado: ${expectedStatuses}.`);
    });
  }

  static waitUntilErrorNextStop(qtde_tentativas = 2, pass = false){
    cy.log('...Remaining attempts: ' + qtde_tentativas);

    Elements.getElement('body')
      .then(($body)=>{
        if ($body.text().includes('client-side exception')){
          Elements.getElementText("h2")
            .then((txt) => {
              if (qtde_tentativas == 0 && pass == false)
                throw 'Erro do next';

              if (txt.trim().includes('client-side exception') && pass == false){
                Navigation.reloadPage();
                this.explicitWait(5000);
                this.waitUntilErrorNextStop(qtde_tentativas - 1, false);
              }else{
                pass = true;
                return "ok";
              }
            });
        }else{
          pass = true;
          return "ok";
        }
      });
  }
}


