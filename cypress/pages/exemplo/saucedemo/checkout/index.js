import Element from '../../../base_page/element';
import Interaction from '../../../base_page/interaction';
import Request from '../../../base_page/request';
import Navigation from '../../../base_page/navigation';
import Validation from '../../../base_page/validation';

const el = require('./elements').ELEMENTS;

export class Saucedemo_Checkout{
  
  static preencher_dados_pessoais(){
    Interaction.typeElement(el.FORM_INFORMACOES_PESSOAIS.INPUT_PRIMEIRO_NOME, 'Caio QA', 0, true, 100)
    Interaction.typeElement(el.FORM_INFORMACOES_PESSOAIS.INPUT_SOBRENOME, 'Senha_12345.*', 0, true, 150)
    Interaction.typeElement(el.FORM_INFORMACOES_PESSOAIS.INPUT_CEP, '88220005', 0, true, 100)
  }

  static ir_para_resumo(){
    Validation.validateElementIsVisible(el.FORM_INFORMACOES_PESSOAIS.BTN_CONTINUAR)
    Interaction.clickElement(el.FORM_INFORMACOES_PESSOAIS.BTN_CONTINUAR)
  }
}