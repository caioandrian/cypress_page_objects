# 🚀 Automação com Cypress e Page Objects

![Cypress](https://img.shields.io/badge/Cypress-E2E%20Testing-green?style=flat&logo=cypress)
![Node.js](https://img.shields.io/badge/Node.js-v18.x%20LTS-green?style=flat&logo=node.js)
![QA Automation](https://img.shields.io/badge/QA%20Automation-Continuous%20Testing-orange?style=flat&logo=testing-library)
![License](https://img.shields.io/badge/License-MIT-brightgreen?style=flat)

Este repositório demonstra a implementação de testes E2E usando Cypress com o padrão Page Objects, proporcionando uma estrutura organizada e de fácil manutenção para automação de testes.

---

## 🎯 Sites de Exemplo

- E-commerce ([https://www.saucedemo.com](https://www.saucedemo.com))

## 📂 Estrutura do Projeto

```
cypress/
├── config-files/       # Configurações de ambiente (hmg, pre, prod)
├── e2e/               # Arquivos de teste
│   └── spec/
│       └── exemplo/
├── pages/             # Implementação do Page Objects
│   ├── base_page/     # Classes base com métodos comuns
│   ├── common/        # Componentes compartilhados
│   └── exemplo/       # Pages específicas por funcionalidade
├── fixtures/          # Dados de teste
├── plugins/           # Configurações de plugins
├── services/          # Serviços de API
└── support/           # Comandos customizados e configurações globais
```

### 🏗️ Padrão Page Objects

O projeto utiliza uma estrutura organizada de Page Objects:

- **base_page/**: Classes base com métodos reutilizáveis
  - `element.js`: Métodos base para elementos
  - `interaction.js`: Interações comuns
  - `navigation.js`: Navegação entre páginas
  - `request.js`: Requisições HTTP
  - `validation.js`: Validações comuns

- **pages/exemplo/**: Implementação específica para cada página
  - Cada página possui:
    - `elements.js`: Mapeamento dos elementos
    - `index.js`: Ações e comportamentos da página

## 🛠️ Tecnologias Utilizadas

- Cypress
- JavaScript
- Page Objects
- Custom Commands

## 📦 Instalação e Execução

1. **Instalação das dependências**
```bash
npm install
```

2. **Scripts disponíveis**
```bash
npm run cy:open              # Abre o Cypress em modo interativo
npm run cy:run-all          # Executa todos os testes em modo headless
npm run cy:run-exemplo-saucedemo  # Executa testes específicos do exemplo
```

## ⚙️ Configuração de Ambiente

O projeto suporta múltiplos ambientes através dos arquivos em `config-files/`:
- `hmg.json`: Ambiente de homologação
- `pre.json`: Ambiente de pré-produção
- `prod.json`: Ambiente de produção

## 📄 Licença

Este projeto está sob a licença MIT.

---