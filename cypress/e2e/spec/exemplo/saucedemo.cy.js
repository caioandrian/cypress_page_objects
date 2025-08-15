import { Saucedemo_login } from '../../../pages/exemplo/saucedemo/login'
import { Saucedemo_Home } from '../../../pages/exemplo/saucedemo/home'
import { Saucedemo_Carrinho } from '../../../pages/exemplo/saucedemo/carrinho'
import { Saucedemo_Checkout } from '../../../pages/exemplo/saucedemo/checkout'
import { Saucedemo_Resumo } from '../../../pages/exemplo/saucedemo/resumo'

describe('SauceDemo - Ecommerce', () => {
  var array_carrinho = []

  beforeEach(() => {
    array_carrinho = []
    Saucedemo_login.acessar_site()
    Saucedemo_login.fazer_login()
  })

  it('Adicionar 2 produtos no carrinho pela home', () => {
    Saucedemo_Home.adicionar_produto_carrinho(2, array_carrinho).as('array_produtos_carrinho')

    cy.get('@array_produtos_carrinho')
      .then((arr) => {
        array_carrinho = arr
        Saucedemo_Home.adicionar_produto_carrinho(3, array_carrinho).as('array_produtos_carrinho')
      })
    
    cy.get('@array_produtos_carrinho')
      .then((arr) => {
        Saucedemo_Home.valida_qtde_produtos_menu_carrinho(arr)
        Saucedemo_Home.acessar_carrinho()
        Saucedemo_Carrinho.valida_produtos_carrinho(arr)
      })
  })

  it('Remover produto do carrinho pela home', () => {
    Saucedemo_Home.adicionar_produto_carrinho(2, array_carrinho).as('array_produtos_carrinho')

    cy.get('@array_produtos_carrinho')
      .then((arr) => {
        array_carrinho = arr
        Saucedemo_Home.remover_produto_carrinho(2, array_carrinho).as('array_produtos_carrinho')
      })

    cy.get('@array_produtos_carrinho')
      .then((arr) => {
        Saucedemo_Home.valida_qtde_produtos_menu_carrinho(arr)
      })
  })

  it('Finalizar pedido com sucesso', () => {
    Saucedemo_Home.adicionar_produto_carrinho(2, array_carrinho).as('array_produtos_carrinho')

    cy.get('@array_produtos_carrinho')
      .then((arr) => {
        array_carrinho = arr
        Saucedemo_Home.adicionar_produto_carrinho(3, array_carrinho).as('array_produtos_carrinho')
      })

    cy.get('@array_produtos_carrinho')
      .then((arr) => {
        Saucedemo_Home.acessar_carrinho()
        Saucedemo_Carrinho.valida_produtos_carrinho(arr)
        Saucedemo_Carrinho.prosseguir_checkout()
        Saucedemo_Checkout.preencher_dados_pessoais()
        Saucedemo_Checkout.ir_para_resumo()
        Saucedemo_Resumo.valida_resumo_compra(arr)
        Saucedemo_Resumo.finalizar_pedido()
      })
  })
})
