/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  beforeEach(() => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3, '?sharedFilterId=7159fa28-876c-4a46-9a0d-c1e7b88ba5e2');
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
  });
  
  it('Vérifier les informations affichées [CLIN-3463]', () => {
    cy.validateTableDataRowKeyClass('*', 1, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('*', 3, /^[^,]+,[^,]+,[^,]+...$/);
    cy.validateTableDataRowKeyContent('*', 4, 'LOSS:chr1:450731-7249626');
    cy.validateTableDataRowKeyContent('*', 5, /^1$/);
    cy.validateTableDataRowKeyContent('*', 6, '450 730');
    cy.validateTableDataRowKeyContent('*', 7, '7 249 625');
    cy.validateTableDataRowKeyContent('*', 8, /^LOSS$/);
    cy.validateTableDataRowKeyContent('*', 9, '6.8 Mb');
    cy.validateTableDataRowKeyContent('*', 10, '1.04404');
    cy.validateTableDataRowKeyContent('*', 11, /^191$/);
    cy.validateTableDataRowKeyContent('*', 12, '0/1');
    cy.validateTableDataRowKeyContent('*', 13, 'CnvCopyRatio, LoDFail');
    cy.validateTableDataRowKeyContent('*', 14, /^128$/);
    cy.validateTableDataRowKeyContent('*', 15, '1979');
    cy.validateTableDataRowKeyContent('*', 16, '25, 7');
    cy.validateTableDataRowKeyContent('*', 17, '-');
    cy.validateTableDataRowKeyContent('*', 18, '-');
  });
});
 
describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  beforeEach(() => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
  });

  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'GAIN');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
  });
 
  it('Valider les liens disponibles [CLIN-3463]', () => {
    cy.get('tr').contains(/^191$/).clickAndWait({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr').contains(/^[^,]+,[^,]+,[^,]+...$/).clickAndWait({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant [CLIN-3463]', () => {
    cy.sortTableAndWait('Variant');
    cy.wait(30*1000);
    cy.validateTableFirstRow('GAIN:chr10:104353843-104454535', 4, true);
    cy.sortTableAndWait('Variant');
    cy.wait(30*1000);
    cy.validateTableFirstRow('LOSS:chrX:624329-13938568', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndWait('Chr.');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^1$/, 5, true);
    cy.sortTableAndWait('Chr.');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^X$/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Début [CLIN-3463]', () => {
    cy.sortTableAndWait('Début');
    cy.wait(30*1000);
    cy.validateTableFirstRow('66 872', 6, true);
    cy.sortTableAndWait('Début');
    cy.wait(30*1000);
    cy.validateTableFirstRow('228 007 104', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin [CLIN-3463]', () => {
    cy.sortTableAndWait('Fin');
    cy.wait(30*1000);
    cy.validateTableFirstRow('465 288', 7, true);
    cy.sortTableAndWait('Fin');
    cy.wait(30*1000);
    cy.validateTableFirstRow('228 511 965', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    cy.sortTableAndWait('Événement');
    cy.wait(30*1000);
    cy.validateTableFirstRow('GAIN', 8, true);
    cy.sortTableAndWait('Événement');
    cy.wait(30*1000);
    cy.validateTableFirstRow('LOSS', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur [CLIN-3463]', () => {
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});

    cy.sortTableAndWait('Longueur');
    cy.wait(30*1000);
    cy.validateTableFirstRow('3.1 kb', 9, true);
    cy.sortTableAndWait('Longueur');
    cy.wait(30*1000);
    cy.validateTableFirstRow('92.4 Mb', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri MS [CLIN-3463]', () => {
    cy.sortTableAndWait('MS');
    cy.wait(30*1000);
    cy.validateTableFirstRow('0.0347309', 10, true);
    cy.sortTableAndWait('MS');
    cy.wait(30*1000);
    cy.validateTableFirstRow('1.83177', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes [CLIN-3463]', () => {
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});

    cy.sortTableAndWait('# Gènes');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^0$/, 11, true);
    cy.sortTableAndWait('# Gènes');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^670$/, 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual. [CLIN-3463]', () => {
    cy.sortTableAndWait('Qual.');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^90$/, 14, true);
    cy.sortTableAndWait('Qual.');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^200$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri BC [CLIN-3463]', () => {
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});

    cy.sortTableAndWait('BC');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^6$/, 15, true);
    cy.sortTableAndWait('BC');
    cy.wait(30*1000);
    cy.validateTableFirstRow(/^7553$/, 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    cy.sortTableAndWait('Trans.');
    cy.wait(30*1000);
    cy.validateTableFirstRow('-', 17, true);
    cy.sortTableAndWait('Trans.');
    cy.wait(30*1000);
    cy.validateTableFirstRow('-', 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    cy.sortTableAndWait('OP');
    cy.wait(30*1000);
    cy.validateTableFirstRow('-', 18, true);
    cy.sortTableAndWait('OP');
    cy.wait(30*1000);
    cy.validateTableFirstRow('-', 18, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Chr.');
    cy.wait(30*1000);
    cy.sortTableAndWait('Chr.');
    cy.wait(30*1000);
    cy.sortTableAndWait('Début');
    cy.sortTableAndWait('Début');
    cy.wait(30*1000);
    cy.validateTableFirstRow('154 144 278', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination [CLIN-3463]', () => {
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
    cy.wait(30*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 1 - 100 de 304'));
  
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20 ').clickAndWait({force: true});
    cy.wait(30*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Suivant').clickAndWait();
    cy.wait(30*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Suivant').clickAndWait({force: true});
    cy.wait(30*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 41 - 60 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').clickAndWait({force: true});
    cy.wait(30*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').clickAndWait({force: true});
    cy.wait(30*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
  });
});
  