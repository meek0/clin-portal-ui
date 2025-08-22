/// <reference types="cypress"/>
import { data } from '../../pom/shared/Data';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

describe('Page des variants - Exporter un variant en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPage(SharedFilters.variant.chrX_123403094);
    VariantsTable.actions.clickDownloadButton();
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    VariantsTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    VariantsTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    VariantsTable.validations.shouldHaveExportedFileContent(data.variantGermline);
  });
});
