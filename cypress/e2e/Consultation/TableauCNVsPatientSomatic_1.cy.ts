/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  beforeEach(() => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitCNVsSomaticPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3, '?sharedFilterId=7159fa28-876c-4a46-9a0d-c1e7b88ba5e2');
  
    cy.showColumn('GT', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('Qual.', 0);
    cy.showColumn('BC', 0);
    cy.showColumn('PE', 0);
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
  });
  
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('*', 1, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('*', 4, /^[^,]+,[^,]+,[^,]+...$/);
    cy.validateTableDataRowKeyContent('*', 5, 'LOSS:chr1:450731-7249626');
    cy.validateTableDataRowKeyClass('*', 6, 'anticon');
    cy.validateTableDataRowKeyContent('*', 7, /^1$/);
    cy.validateTableDataRowKeyContent('*', 8, '450 730');
    cy.validateTableDataRowKeyContent('*', 9, '7 249 625');
    cy.validateTableDataRowKeyContent('*', 10, /^LOSS$/);
    cy.validateTableDataRowKeyContent('*', 11, '6.8 Mb');
    cy.validateTableDataRowKeyContent('*', 12, '1.04404');
    cy.validateTableDataRowKeyContent('*', 13, '-');
    cy.validateTableDataRowKeyContent('*', 14, /^191$/);
    cy.validateTableDataRowKeyContent('*', 15, '0/1');
    cy.validateTableDataRowKeyContent('*', 16, 'CnvCopyRatio, LoDFail');
    cy.validateTableDataRowKeyContent('*', 17, /^128$/);
    cy.validateTableDataRowKeyContent('*', 18, '1979');
    cy.validateTableDataRowKeyContent('*', 19, '25, 7');
    cy.validateTableDataRowKeyContent('*', 20, '-');
    cy.validateTableDataRowKeyContent('*', 21, '-');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV (TO)-CNV (TO)', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV (TO)').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('SNV (TO)').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV (TO)').should('exist');
  });
});
