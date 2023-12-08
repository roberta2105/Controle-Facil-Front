
describe('Formulario de Cadastro', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Usuário deve conseguir se cadastrar com sucesso', () => {
        cy.getByData('botao-cadastro').click()
        cy.getByData('email-input').type('rob@gmail.com')
        cy.getByData('senha-input').type('1234')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')

    })
})