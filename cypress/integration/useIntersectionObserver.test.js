describe('useIntersectionObserver', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.scrollTo(0, 0)
  })

  it('should work for element with a custom viewport', () => {
    cy.get('[data-testid="div-viewport-parent-el"]').should(
      'contain',
      'Not intersecting with parent'
    )
    cy.get('[data-testid="toggle-container-size"]').click()
    cy.get('[data-testid="div-viewport-parent-el"]').should('contain', 'Intersecting with parent')
    cy.get('[data-testid="toggle-container-size"]').click()
    cy.get('[data-testid="div-viewport-parent-el"]').should(
      'contain',
      'Not intersecting with parent'
    )
  })

  it('should work for elements that intersect with their parent document', () => {
    cy.get('[data-testid="div-viewport-window"]')
      .should('contain', 'Hidden')
      .scrollIntoView()
      .should('contain', 'Visible')

    cy.scrollTo(0, 0)

    cy.get('[data-testid="div-viewport-window"]').should('contain', 'Hidden')
  })
})
