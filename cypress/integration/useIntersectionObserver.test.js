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

  it('should report correctly when target ref is forwarded from a parent', () => {
    cy.get('[data-testid="toggle-ref-forwarding-parent-doc-test"]').should(
      'contain',
      'Show ref fwd parent doc test'
    )
    cy.get('[data-testid="toggle-ref-forwarding-parent-doc-test"]').click()
    cy.get('[data-testid="toggle-ref-forwarding-parent-doc-test"]').should(
      'contain',
      'Hide ref fwd parent doc test'
    )
    cy.get('[data-testid="box"]').should('contain', 'In viewport')
    cy.get('[data-testid="toggle-box-position"]').click()
    cy.get('[data-testid="box"]').should('contain', 'Out of viewport')
    cy.scrollTo(0, 413) // just about greater than 50% of target element intersects with parent doc viewport
    cy.get('[data-testid="box"]').should('contain', 'In viewport')
    cy.scrollTo(0, 412) // just about less than 50% of target element intersects with parent doc viewport
    cy.get('[data-testid="box"]').should('contain', 'Out of viewport')
    // test side effect from the target ref that was forwarded to the element to watch
    cy.window().then(window => {
      expect(window.forwardedTargetRef).length(1)
      expect(window.forwardedTargetRef[0].classList.contains('target-div')).to.be.true
    })
  })

  it('should report correctly when a parent element is used as viewport', () => {
    cy.get('[data-testid="toggle-simple-parent-element-test"]').should(
      'contain',
      'Show simple parent element test'
    )
    cy.get('[data-testid="toggle-simple-parent-element-test"]').click()
    cy.get('[data-testid="toggle-simple-parent-element-test"]').should(
      'contain',
      'Hide simple parent element test'
    )
    cy.get('[data-testid="child"]').should('contain', 'In viewport')
    cy.get('[data-testid="toggle-box-position"]').click()
    cy.get('[data-testid="child"]').should('contain', 'Out of viewport')
    cy.get('[data-testid="viewport"]').scrollTo(0, 68) // just 1px of target intersecting with the parent viewport
    cy.get('[data-testid="child"]').should('contain', 'In viewport')
    cy.get('[data-testid="viewport"]').scrollTo(0, 67) // just 1px of target outside of the parent viewport
    cy.get('[data-testid="child"]').should('contain', 'Out of viewport')
  })

  it('should report correctly when a parent element ref is forwarded from a parent', () => {
    cy.get('[data-testid="toggle-ref-forwarding-parent-element-test"]').should(
      'contain',
      'Show ref fwd parent element test'
    )
    cy.get('[data-testid="toggle-ref-forwarding-parent-element-test"]').click()
    cy.get('[data-testid="toggle-ref-forwarding-parent-element-test"]').should(
      'contain',
      'Hide ref fwd parent element test'
    )
    cy.get('[data-testid="first-child"]').should('contain', 'First child >= 75% in viewport')
    cy.get('[data-testid="second-child"]').should('contain', 'Second child >= 75% in viewport')
    cy.get('[data-testid="toggle-boxes-positions"]').click()
    cy.get('[data-testid="first-child"]').should('contain', 'First child out of viewport')
    cy.get('[data-testid="second-child"]').should('contain', 'Second child out of viewport')
    cy.get('[data-testid="viewport"]').scrollTo(0, 190) // 75% or more of first child in viewport
    cy.get('[data-testid="first-child"]').should('contain', 'First child >= 75% in viewport')
    cy.get('[data-testid="second-child"]').should('contain', 'Second child out of viewport')
    cy.get('[data-testid="viewport"]').scrollTo(0, 250) // 75% or more of second child in viewport
    cy.get('[data-testid="first-child"]').should('contain', 'First child >= 75% in viewport')
    cy.get('[data-testid="second-child"]').should('contain', 'Second child >= 75% in viewport')
    cy.window().then(window => {
      expect(window.forwardedViewportRef).length(1)
      expect(window.forwardedViewportRef[0].classList.contains('viewport')).to.be.true
    })
  })
})
