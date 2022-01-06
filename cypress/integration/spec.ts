describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('.suchbutton').click({multiple: true, force: true});
    //first e2e tests for pipeline
  })
})
