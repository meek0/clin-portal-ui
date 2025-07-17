/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { formatWithSpaceThousands } from '../../pom/shared/Utils';

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
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 2, 'FlagDropdown');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 3, 'NoteCell');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 4, 'InterpretationCell');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 5, data.variantGermline.variant);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 6, data.variantGermline.type);
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 7, 'anticon');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 8, data.variantGermline.gene);
    cy.validateTableDataRowKeyAttr(data.variantGermline.dataRowKey, 8, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 9, data.variantGermline.consequenceImpact);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 9, data.variantGermline.consequence);
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(10).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(10).find('path[d*="M8.98279"]').should('exist'); // M
    cy.get(`tr[data-row-key="${data.variantGermline.dataRowKey}"] td`).eq(10).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 11, data.variantGermline.omim);
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 11, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 12, data.variantGermline.clinvar[0]);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 12, data.variantGermline.clinvar[1]);
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 12, 'ant-tag-green');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 12, 'ant-tag-lime');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 13, data.variantGermline.max_franklin);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 14, data.variantGermline.max_exomiser);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 15, data.variantGermline.acmg_franklin);
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 15, 'ant-tag');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 16, data.variantGermline.acmg_exomiser);
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 16, 'ant-tag-orange');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 17, '1.02e-3');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 17, 'GnomadCell_gnomadIndicator');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 18, formatWithSpaceThousands(data.variantGermline.gnomad_alt));
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 19, data.variantGermline.rqdmP);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 19, data.variantGermline.rqdmF);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 20, '170');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 20, 'GQLine_high');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 21, /^0$/);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 22, /^1$/);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 23, '0/1 : 0');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 24, '-');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 25, '-');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 26, 'XLR');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 27, '0.97');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 28, 'M');
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 28, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 29, '84');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 30, '84');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 31, '1.00');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 32, 'PASS');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 33, 'PP4, BP6_Strong');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 34, /^3$/);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 34, '(6.93e-5)');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 35, data.variantGermline.tier);
    cy.validateTableDataRowKeyClass(data.variantGermline.dataRowKey, 35, 'ant-tag-default');
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 36, data.variantGermline.cadd);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 37, data.variantGermline.revel);
    cy.validateTableDataRowKeyContent(data.variantGermline.dataRowKey, 38, '-');
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
  