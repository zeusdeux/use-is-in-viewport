before(() => {
  cy.visit('/')
})

describe('useIsInViewport', () => {
  it('should report correctly when an element is visible in parent document', () => {
    cy.get('[data-testid="toggle-simple-parent-doc-test"]').should(
      'contain',
      'Hide simple parent doc test'
    )
    cy.get('[data-testid="box"]').should('contain', 'In viewport')
    cy.get('[data-testid="toggle-box-position"]').click()
    cy.get('[data-testid="box"]').should('contain', 'Out of viewport')
    cy.scrollTo(0, 430)
    cy.get('[data-testid="box"]').should('contain', 'In viewport')
    cy.scrollTo(0, 600)
    cy.get('[data-testid="box"]').should('contain', 'In viewport')
  })

  // it('should report correctly when ')

  // it('should work for element with a custom viewport', () => {
  //   cy.get('[data-testid="div-viewport-parent-el"]').should(
  //     'contain',
  //     'Not intersecting with parent'
  //   )
  //   cy.get('[data-testid="toggle-container-size"]').click()
  //   cy.get('[data-testid="div-viewport-parent-el"]').should('contain', 'Intersecting with parent')
  //   cy.get('[data-testid="toggle-container-size"]').click()
  //   cy.get('[data-testid="div-viewport-parent-el"]').should(
  //     'contain',
  //     'Not intersecting with parent'
  //   )
  // })

  // it('should work for elements that intersect with their parent document', () => {
  //   cy.get('[data-testid="div-viewport-window"]')
  //     .should('contain', 'Hidden')
  //     .scrollIntoView()
  //     .should('contain', 'Visible')

  //   cy.scrollTo(0, 0)
  //   cy.get('[data-testid="div-viewport-window"]').should('contain', 'Hidden')
  // })
})
