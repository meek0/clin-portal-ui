/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.showColumn('gnomAD ALT', 0);
  cy.showColumn('QP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
});

describe('Page des variants d\'un patient (somatic) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 2, 'FlagDropdown');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 3, 'NoteCell');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 4, 'InterpretationCell');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 5, 'chr10:g.1096268T>C');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 6, 'SNV');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 7, 'TO');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 7, 'ant-tag');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 8, 'anticon');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 9, 'WDR37');
    cy.validateTableDataRowKeyAttr('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 9, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, 'ConsequencesCell_highImpact');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, 'Stop Lost p.Ter250Arg');
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(11).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(11).find('path[d*="M8.98279"]').should('not.exist'); // M
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(11).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 12, 'AD');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 12, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 13, /^B$/);
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 13, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 14, 'hotspotOutlined');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 15, 'Other');
    cy.validateTableDataRowKeyClass('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 15, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 16, /^1$/);
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 16, '(2.31e-5)');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, '9.91e-1');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, 'GnomadCell_gnomadIndicatorDefault');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 18, '151 043');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 19, /^128$/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 19, /(\d{1}.\d{2}e(-|\+)\d{1})/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 20, /^3$/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 20, '1.00e+0');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 21, '64.73');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 22, '0/1');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 23, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 24, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 25, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 26, '1.00');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 27, 'PASS');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 28, '4.00e+0');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 29, '-');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'SNV');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV (TO)-CNV (TO)', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV (TO)').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('CNV (TO)').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV (TO)').should('exist');
  });
});
