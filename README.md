# Gerenciamento-e-Qualidade-de-Softwares---OFICIAL-2

O projeto Gerenciamento-e-Qualidade-de-Softwares é uma avaliação feita com cypress para testar uma api de matrículas 

### Instruções para uso / teste

Baixe o respositório no Github: https://github.com/PHPauloReis/oficial2-matriculas-api/

Execute com o: Intellij Idea Community

**Endpoint:** http://localhost:8080/v1/matriculas/{numero_da_matricula}

**Method:** GET

**Header:** X-API-KEY = unime-qualidade-oficial2

## Instalar dependências 
```bash
yarn
# or
npm install
```
### Antes de iniciar o cypress é obrigatório ter a api levantada para o cypress funcionar 

## Inicie o aplicativo  Cypress
```bash
npx cypress open
```

### Após iniciar o cypress com a api levantada, escolha a opção de teste E2E Testing, utilize o navegador Eletron.

### Com o cypress aberto Clique 2x em matriculas.cy.js para rodar os testes
