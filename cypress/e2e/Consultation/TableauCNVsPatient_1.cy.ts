/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=5747ace3-449a-46bf-9ae9-08842b88bcb5');
  cy.showColumn('GT', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Qual.', 0);
  cy.showColumn('MS', 0);
  cy.showColumn('BC', 0);
  cy.showColumn('PE', 0);
  cy.showColumn('Trans.', 0);
  cy.showColumn('OP', 0);
});

describe('Page des CNVs d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('*', 1, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('*', 4, 'CFHR1');
    cy.validateTableDataRowKeyContent('*', 4, 'CFHR3');
    cy.validateTableDataRowKeyContent('*', 5, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyClass('*', 6, 'anticon');
    cy.validateTableDataRowKeyContent('*', 7, /^1$/);
    cy.validateTableDataRowKeyContent('*', 8, '196 774 872');
    cy.validateTableDataRowKeyContent('*', 9, '196 832 006');
    cy.validateTableDataRowKeyContent('*', 10, /^GAIN$/);
    cy.validateTableDataRowKeyContent('*', 11, '57.1 kb');
    cy.validateTableDataRowKeyContent('*', 12, '1.38788');
    cy.validateTableDataRowKeyContent('*', 13, /^3$/);
    cy.validateTableDataRowKeyContent('*', 14, '128');
    cy.validateTableDataRowKeyContent('*', 14, '9.55e-1');
    cy.validateTableDataRowKeyContent('*', 15, /^2$/);
    cy.validateTableDataRowKeyContent('*', 16, './1');
    cy.validateTableDataRowKeyContent('*', 17, 'PASS');
    cy.validateTableDataRowKeyContent('*', 18, /^75$/);
    cy.validateTableDataRowKeyContent('*', 19, /^22$/);
    cy.validateTableDataRowKeyContent('*', 20, '3, 0');
    cy.validateTableDataRowKeyContent('*', 21, '-');
    cy.validateTableDataRowKeyContent('*', 22, '-');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV-CNV', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('SNV').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');
  });
 
  it('Valider les liens disponibles Lien Gènes', () => {
    cy.get('tr').contains(/^2$/).clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr').contains('CFHR1').clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(5).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/sv/chr1-196774872-196832006-DUP-HG38');
  });
 
  it('Valider les liens disponibles Lien ClinGen', () => {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(6).find('a[href]')
      .should('have.attr', 'href', 'https://search.clinicalgenome.org/kb/regions?page=1&type=GRCh38&region=chr1%3A196774872-196832006&size=25&search=');
  });
});
