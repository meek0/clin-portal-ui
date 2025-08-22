/// <reference types="cypress"/>
import { oneMinute } from '../../pom/shared/Utils';

describe('Télécharger les panels', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visit('/');

    cy.get('[class="ant-page-header-heading-extra"] svg[data-icon="download"]').clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('panels.xlsx');
  });
});
