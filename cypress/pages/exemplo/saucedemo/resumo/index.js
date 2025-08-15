import Element from '../../../base_page/element';
import Interaction from '../../../base_page/interaction';
import Request from '../../../base_page/request';
import Navigation from '../../../base_page/navigation';
import Validation from '../../../base_page/validation';

const el = require('./elements').ELEMENTS;

export class Saucedemo_Resumo{
  
  static valida_resumo_compra(array){
    Validation.validateArrayElementLength(el.CHECKOUT_RESUMO.ITEM, array.length)
    array.forEach( (obj, index) => {
      Validation.validateElementHaveText(el.CHECKOUT_RESUMO.ITEM_TITULO, obj.titulo, index)
      Validation.validateElementHaveText(el.CHECKOUT_RESUMO.ITEM_PRECO, obj.preco, index)
    });
    Validation.validateElementIsNotEmpty(el.CHECKOUT_RESUMO.ITEM)
    Validation.validateElementIsNotEmpty(el.CHECKOUT_RESUMO.INFO_SUBTOTAL)
    Validation.validateElementIsNotEmpty(el.CHECKOUT_RESUMO.INFO_FRETE)
    Validation.validateElementIsNotEmpty(el.CHECKOUT_RESUMO.INFO_TOTAL)
  }

  static finalizar_pedido(){
    Validation.validateElementIsVisible(el.CHECKOUT_RESUMO.BTN_FINALIZAR)
    Interaction.clickElement(el.CHECKOUT_RESUMO.BTN_FINALIZAR)
    Validation.validateElementHaveText(el.CHECKOUT_RESUMO.H2_MSG_SUCESSO, 'Thank you for your order!')
    Validation.validateElementIsVisible(el.CHECKOUT_RESUMO.BTN_VOLTAR_HOME)
  }
}