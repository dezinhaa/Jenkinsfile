/// <reference types="cypress" />

describe('Login - Testes da API ServRest', () => {

  it('Deve fazer o login com sucesso  ', () => {
    cy.request({
      method: 'Post' ,
      url: 'http://localhost:3000/login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }

    }).then((response) => {
      expect(response.body.message).to.be.equal('Login realizado com sucesso')
      cy.log(response.body.authorization)
      
      


    })
    
  });
  
});