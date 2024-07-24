/// <reference types="cypress"/>
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visit('/');

  cy.get('[class="ant-page-header-heading-extra"] svg[data-icon="download"]').clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Télécharger les panels', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('panels.xlsx');
  });
});
