import Element from '../../../base_page/element';
import Interaction from '../../../base_page/interaction';
import Request from '../../../base_page/request';
import Navigation from '../../../base_page/navigation';
import Validation from '../../../base_page/validation';

const el = require('./elements').ELEMENTS;

export class Saucedemo_Home{

  static adicionar_produto_carrinho(posicao, array){
    //recuperar infos do produto
    Interaction.clickElement(el.PRODUTOS.BTN_ADICIONAR_CARRINHO, posicao)
    Validation.validateElementHaveText(el.PRODUTOS.BTN_ADICIONAR_CARRINHO, 'Remove', posicao)

    let dados_produto = {}
    
    Element.getElementText(el.PRODUTOS.ITEM_TITULO, posicao).then((titulo) =>{
      dados_produto.titulo = titulo
    })

    Element.getElementText(el.PRODUTOS.ITEM_PRECO, posicao).then((preco) =>{
      dados_produto.preco = preco
    })

    array.push(dados_produto)
    
    return cy.wrap(array)
  }

  static remover_produto_carrinho(posicao, array){
    Interaction.clickElement(el.PRODUTOS.BTN_ADICIONAR_CARRINHO, posicao)
    array.pop()
    Validation.validateElementHaveText(el.PRODUTOS.BTN_ADICIONAR_CARRINHO, 'Add to cart', posicao)

    return cy.wrap(array)
  }

  static valida_qtde_produtos_menu_carrinho(array){
    if(array.length >= 1)
      Validation.validateElementHaveText(el.MENU.CARRINHO_QTDE_PRODUTOS, array.length)
    else
      Validation.validateElementNotExist(el.MENU.CARRINHO_QTDE_PRODUTOS)
  }

  static acessar_carrinho(){
    Interaction.clickElement(el.MENU.CARRINHO)
  }
}