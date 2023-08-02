/// <reference types="cypress" />
import contrato from '../Contratos/produtos.contract'

describe('Testes da funcionalidades produtos', () => {
   let token

    before(() => {
        cy.token('fulano@qa.com','teste').then(tkn => { token = tkn})
    });

    it('Deve validar contrato de produtos', () => {
        cy.request('http://localhost:3000/produtos').then(respose =>{
            return contrato.validateAsync(respose.body)

        })
        
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'Get' ,
            url: 'http://localhost:3000/produtos'
        }).then((response) =>{
            expect(response.body.produtos[1].nome).to.equal('Samsung 60 polegadas')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(25)
        })     
    });

    it('Cadastrar produtos', () => {
        let produto = `Produto Debora ${Math.floor(Math.random() * 1000000)}`
        cy.request({
            method:'Post',
            url:'http://localhost:3000/produtos',
            body:{
                "nome": produto ,
                "preco": 50,
                "descricao": "Mousee",
                "quantidade": 150
              },
              headers:{authorization: token
              }
        }).then((response) =>{
            expect(response.body.message).to.be.equal('Cadastro realizado com sucesso')
        })      
    });

    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.cadastrarProduto(token,'Produto Debora 1', '230','descricao do produto novo', '140')

        .then((response) =>{
            expect(response.body.message).to.be.equal('Já existe produto com esse nome')
        })      
    });

    it('Deve editar um produto ja cadastrado', () => {
        cy.request('http://localhost:3000/produtos').then(response =>{
           
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'Put',
                url:`http://localhost:3000/produtos/${id}`,
                headers:{authorization: token},
                body: {
                    "nome": "Produto Debora 2",
                    "preco": 500,
                    "descricao": "produto editado",
                    "quantidade": 200
                  }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
        
    });

    it('Deve editar um produto cadastrado previamente', () => {
        let produto = `Produto ${Math.floor(Math.random() * 1000000)}`
        cy.cadastrarProduto(token,produto, 230,"descricao do produto novo", 140)
        .then(response => {
            let id = response.body._id
            cy.request({
                method: 'Put',
                url:`http://localhost:3000/produtos/${id}`,
                headers:{authorization: token},
                body: {
                    "nome": "Produto editado 1",
                    "preco": 10,
                    "descricao": "produto editado",
                    "quantidade": 1000
                  }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
        
        
    });

    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Produto ${Math.floor(Math.random() * 1000000)}`
        cy.cadastrarProduto(token,produto, 230,"descricao do produto novo", 140)
        .then(response => {
            let id = response.body._id
            cy.request ({
                method: 'Delete',
                url: `http://localhost:3000/produtos/${id}`,
                headers: {authorization: token}
            }).then(response =>{
                expect(response.body.message).to.equal('Registro excluído com sucesso')
                expect(response.status).to.equal(200)
            })


        })

        
    });

});




    

