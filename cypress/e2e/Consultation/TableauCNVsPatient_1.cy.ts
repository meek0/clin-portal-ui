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
  cy.showColumn('SM', 0);
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
    cy.validateTableDataRowKeyContent('*', 5, '1q31.3');
    cy.validateTableDataRowKeyContent('*', 6, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyClass('*', 7, 'anticon');
    cy.validateTableDataRowKeyContent('*', 8, /^1$/);
    cy.validateTableDataRowKeyContent('*', 9, '196 774 872');
    cy.validateTableDataRowKeyContent('*', 10, '196 832 006');
    cy.validateTableDataRowKeyContent('*', 11, /^GAIN$/);
    cy.validateTableDataRowKeyContent('*', 12, '57.1 kb');
    cy.validateTableDataRowKeyContent('*', 13, '1.38788');
    cy.validateTableDataRowKeyContent('*', 14, /^3$/);
    cy.validateTableDataRowKeyContent('*', 15, '-');
    cy.validateTableDataRowKeyContent('*', 16, '-');
    cy.validateTableDataRowKeyContent('*', 17, '128');
    cy.validateTableDataRowKeyContent('*', 17, /9\.\d{2}e-1/);
    cy.validateTableDataRowKeyContent('*', 18, /^2$/);
    cy.validateTableDataRowKeyContent('*', 19, './1');
    cy.validateTableDataRowKeyContent('*', 20, 'PASS');
    cy.validateTableDataRowKeyContent('*', 21, /^75$/);
    cy.validateTableDataRowKeyContent('*', 22, /^22$/);
    cy.validateTableDataRowKeyContent('*', 23, '3, 0');
    cy.validateTableDataRowKeyContent('*', 24, '-');
    cy.validateTableDataRowKeyContent('*', 25, '-');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV-CNV', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('SNV').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');
  });
 
  it('Valider les liens disponibles Lien Gènes', () => {
    cy.get('tr').contains('CFHR1').clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Valider les liens disponibles Lien Cytobande', () => {
    cy.get('tr').contains('1q31.3').clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(6).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/sv/chr1-196774872-196832006-DUP-HG38');
  });
 
  it('Valider les liens disponibles Lien ClinGen', () => {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(7).find('a[href]')
      .should('have.attr', 'href', 'https://search.clinicalgenome.org/kb/regions?page=1&type=GRCh38&region=chr1%3A196774872-196832006&size=25&search=');
  });
 
  it('Valider les liens disponibles Lien #Gènes', () => {
    cy.get('tr').contains(/^2$/).clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
});
