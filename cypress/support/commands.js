// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('token', (email, senha) => {

    cy.request({
        method: 'Post' ,
        url: 'http://localhost:3000/login',
        body: {
          "email": email,   
          "password": senha
        }
  
      }).then((response) => {
        expect(response.body.message).to.be.equal('Login realizado com sucesso')
        return response.body.authorization  
      })

})
Cypress.Commands.add('cadastrarProduto',(token,produto,preco,descricao,quantidade) =>{
    cy.request({
        method:'Post',
        url:'http://localhost:3000/produtos',
        headers:{authorization: token},
        body:{
            "nome": produto ,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          },
          failOnStatusCode: false
        })
     

})
