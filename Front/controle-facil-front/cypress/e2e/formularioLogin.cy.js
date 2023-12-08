
describe('Formulario de Login', ()=> {
    beforeEach(()=>{
        cy.visit('/'); 
      });

    it('Não deve permitir um email inválido', () => {
        cy.getByData('email-input').type('robo@gmail.com')
        cy.getByData('senha-input').type('1234')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 
        'O email digitado é inválido')
    })

    it('Não deve permitir um campo em branco', () => {
        cy.getByData('senha-input').type('1234')
        cy.getByData('botao-enviar').click()
        
    })
})