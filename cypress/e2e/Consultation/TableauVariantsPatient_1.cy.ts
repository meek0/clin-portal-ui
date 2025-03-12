/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.showColumn('M : P', 0);
  cy.showColumn('HC', 0);
  cy.showColumn('HCP', 0);
  cy.showColumn('Trans.', 0);
  cy.showColumn('QP', 0);
  cy.showColumn('OP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Crit. Exo.', 0);
  cy.showColumn(/^CMC$/, 0);
  cy.showColumn('Tier', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
  cy.showColumn('Crit. Fra.', 0);
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 2, 'FlagDropdown');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 3, 'NoteCell');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 4, 'InterpretationCell');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'chrX:g.123403094G>A');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 6, 'SNV');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, 'anticon');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'GRIA3');
    cy.validateTableDataRowKeyAttr('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, 'ConsequencesCell_moderateImpact');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, 'Missense p.Arg394Gln');
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(10).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(10).find('path[d*="M8.98279"]').should('exist'); // M
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(10).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, 'XLR');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, /^B$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, /^LB$/);
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, 'ant-tag-lime');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 13, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 14, '0.964');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 15, 'ND');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 15, 'ant-tag');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 16, 'VUS');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 16, 'ant-tag-orange');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 17, '9.00e-4');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 17, 'GnomadCell_gnomadIndicator');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 18, '101');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 19, /^6$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 19, /(\d{1}.\d{2}e-2)/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 20, '170');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 20, 'GQLine_high');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 21, /^1$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 22, '0/1 : 0');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 23, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 24, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 25, 'XLR');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 26, '0.97');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 27, 'M');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 27, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 28, '84');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 29, '84');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 30, '1.00');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 31, 'PASS');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 32, 'PP4, BP6_Strong');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 33, /^3$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 33, '(6.93e-5)');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 34, 'Other');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 34, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 35, '2.56e+1');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 36, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 37, '-');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, 'd3eefb82-edcc-42f1-a4e6-28808bd06f34');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV-CNV', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('CNV').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');
  });
});
  