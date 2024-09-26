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
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 2, 'chr10:g.1096268T>C');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 3, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 4, 'SNV');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 5, 'TO');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 5, 'ant-tag');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 6, 'anticon');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 7, 'WDR37');
    cy.validateTableDataRowKeyAttr('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 7, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 8, 'ConsequencesCell_highImpact');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 8, 'Stop Lost p.Ter250Arg');
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(9).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(9).find('path[d*="M8.98279"]').should('not.exist'); // M
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"] td').eq(9).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, 'AD');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 11, /^B$/);
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 11, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 12, 'hotspotOutlined');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 13, 'Other');
    cy.validateTableDataRowKeyClass('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 13, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 14, /^1$/);
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 14, '(2.31e-5)');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 15, '9.91e-1');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 15, 'GnomadCell_gnomadIndicatorDefault');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 16, '150 926');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, /^128$/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, /(\d{1}.\d{2}e(-|\+)\d{1})/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 18, /^3$/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 18, '1.00e+0');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 19, '64.73');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 20, '0/1');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 21, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 22, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 23, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 24, '1.00');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 25, 'PASS');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 26, '4.00e+0');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 27, '-');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'SNV');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
});
