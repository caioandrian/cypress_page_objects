import Element from '../../../base_page/element';
import Interaction from '../../../base_page/interaction';
import Request from '../../../base_page/request';
import Navigation from '../../../base_page/navigation';
import Validation from '../../../base_page/validation';

const el = require('./elements').ELEMENTS;

export class Saucedemo_Carrinho{

  static valida_produtos_carrinho(array){
    array.forEach( (obj, index) => {
      Validation.validateElementHaveText(el.CARRINHO.ITEM_TITULO, obj.titulo, index)
      Validation.validateElementHaveText(el.CARRINHO.ITEM_PRECO, obj.preco, index)
    });
  }
  
  static prosseguir_checkout(){
    Validation.validateElementIsVisible(el.CARRINHO.BTN_CHECKOUT)
    Interaction.clickElement(el.CARRINHO.BTN_CHECKOUT)
  }
}