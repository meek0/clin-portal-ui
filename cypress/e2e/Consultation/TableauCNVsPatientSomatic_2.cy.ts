/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});

    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'GAIN');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
  });
 
  it('Valider les liens disponibles Lien Gènes', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});

    cy.get('tr').contains(/^[^,]+,[^,]+,[^,]+...$/).clickAndWait({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3, '?sharedFilterId=7159fa28-876c-4a46-9a0d-c1e7b88ba5e2');
    
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(5).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/sv/chr1-450730-7249625-DEL-HG38');
  });
 
  it('Valider les liens disponibles Lien ClinGen', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3, '?sharedFilterId=7159fa28-876c-4a46-9a0d-c1e7b88ba5e2');
    
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(6).find('a[href]')
      .should('have.attr', 'href', 'https://search.clinicalgenome.org/kb/regions?page=1&type=GRCh38&region=chr1%3A450730-7249625&size=25&search=');
  });
 
  it('Valider les liens disponibles Lien #Gènes', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.get('tr').contains(/^191$/).clickAndWait({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Variant');
    cy.wait(15*1000);
    cy.validateTableFirstRow('GAIN:chr10:104353843-104454535', 5, true);
    cy.sortTableAndWait('Variant');
    cy.wait(15*1000);
    cy.validateTableFirstRow('LOSS:chrX:624329-13938568', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Chr.');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^1$/, 7, true);
    cy.sortTableAndWait('Chr.');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^X$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Début');
    cy.wait(15*1000);
    cy.validateTableFirstRow('66 872', 8, true);
    cy.sortTableAndWait('Début');
    cy.wait(15*1000);
    cy.validateTableFirstRow('228 007 104', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Fin');
    cy.wait(15*1000);
    cy.validateTableFirstRow('465 288', 9, true);
    cy.sortTableAndWait('Fin');
    cy.wait(15*1000);
    cy.validateTableFirstRow('228 511 965', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Événement');
    cy.wait(15*1000);
    cy.validateTableFirstRow('GAIN', 10, true);
    cy.sortTableAndWait('Événement');
    cy.wait(15*1000);
    cy.validateTableFirstRow('LOSS', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Longueur');
    cy.wait(15*1000);
    cy.validateTableFirstRow('3.1 kb', 11, true);
    cy.sortTableAndWait('Longueur');
    cy.wait(15*1000);
    cy.validateTableFirstRow('92.4 Mb', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('MS');
    cy.wait(15*1000);
    cy.validateTableFirstRow('0.0347309', 12, true);
    cy.sortTableAndWait('MS');
    cy.wait(15*1000);
    cy.validateTableFirstRow('1.83177', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM [CLIN-3886]', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('RQDM');
    cy.wait(15*1000);
    cy.validateTableFirstRow('-', 13, true);
    cy.sortTableAndWait('RQDM');
    cy.wait(15*1000);
    cy.validateTableFirstRow('22', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('# Gènes');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^0$/, 14, true);
    cy.sortTableAndWait('# Gènes');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^670$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Qual.');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^90$/, 17, true);
    cy.sortTableAndWait('Qual.');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^200$/, 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri BC', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('BC');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^6$/, 18, true);
    cy.sortTableAndWait('BC');
    cy.wait(15*1000);
    cy.validateTableFirstRow(/^7553$/, 18, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Trans.');
    cy.wait(15*1000);
    cy.validateTableFirstRow('-', 20, true);
    cy.sortTableAndWait('Trans.');
    cy.wait(15*1000);
    cy.validateTableFirstRow('-', 20, true);
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('OP');
    cy.wait(15*1000);
    cy.validateTableFirstRow('-', 21, true);
    cy.sortTableAndWait('OP');
    cy.wait(15*1000);
    cy.validateTableFirstRow('-', 21, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.sortTableAndWait('Chr.');
    cy.wait(15*1000);
    cy.sortTableAndWait('Chr.');
    cy.wait(15*1000);
    cy.sortTableAndWait('Début');
    cy.sortTableAndWait('Début');
    cy.wait(15*1000);
    cy.validateTableFirstRow('154 144 278', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('10 ').clickAndWait({force: true});
    
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
    cy.wait(15*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 1 - 100 de 304'));
  
    cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20 ').clickAndWait({force: true});
    cy.wait(15*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');

    cy.wait(15*1000);
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Suivant').clickAndWait({force: true});
    cy.wait(15*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Suivant').clickAndWait({force: true});
    cy.wait(15*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 41 - 60 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').clickAndWait({force: true});
    cy.wait(15*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');
  
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').clickAndWait({force: true});
    cy.wait(15*1000);
    cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de 304'));
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
  });
});
  