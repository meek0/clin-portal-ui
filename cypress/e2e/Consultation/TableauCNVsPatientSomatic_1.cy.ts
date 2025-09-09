/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
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
  };
  
  it('Vérifier les informations affichées [CLIN-4567]', () => {
    setupTest();
    cy.validateTableDataRowKeyClass('*', 1, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('*', 4, /^[^,]+,[^,]+,[^,]+...$/);
    cy.validateTableDataRowKeyContent('*', 5, '1p36.33, 1p36.31, 1p36.32');
    cy.validateTableDataRowKeyContent('*', 6, 'LOSS:chr1:450731-7249626');
    cy.validateTableDataRowKeyClass('*', 7, 'anticon');
    cy.validateTableDataRowKeyContent('*', 8, /^1$/);
    cy.validateTableDataRowKeyContent('*', 9, '450 730');
    cy.validateTableDataRowKeyContent('*', 10, '7 249 625');
    cy.validateTableDataRowKeyContent('*', 11, /^LOSS$/);
    cy.validateTableDataRowKeyContent('*', 12, '6.8 Mb');
    cy.validateTableDataRowKeyContent('*', 13, '1.04404');
    cy.validateTableDataRowKeyContent('*', 14, '-');
    cy.validateTableDataRowKeyContent('*', 15, '-');
    cy.validateTableDataRowKeyContent('*', 16, '-');
    cy.validateTableDataRowKeyContent('*', 17, /^191$/);
    cy.validateTableDataRowKeyContent('*', 18, /^0$/);
    cy.validateTableDataRowKeyContent('*', 19, '0/1');
    cy.validateTableDataRowKeyContent('*', 20, 'CnvCopyRatio, LoDFail');
    cy.validateTableDataRowKeyContent('*', 21, /^128$/);
    cy.validateTableDataRowKeyContent('*', 22, '1979');
    cy.validateTableDataRowKeyContent('*', 23, '25, 7');
    cy.validateTableDataRowKeyContent('*', 24, '-');
    cy.validateTableDataRowKeyContent('*', 25, '-');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV (TO)-CNV (TO)', () => {
    setupTest();
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV (TO)').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('SNV (TO)').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV (TO)').should('exist');
  });
});
