/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage(SharedFilters.variant.chrX_123403094);
  VariantsTable.actions.showAllColumns();
});

describe('Page des variants - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    VariantsTable.validations.shouldShowTableContent(data.variantGermline);
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('exist');
  });
});
