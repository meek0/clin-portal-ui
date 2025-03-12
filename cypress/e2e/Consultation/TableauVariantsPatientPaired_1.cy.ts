/// <reference types="cypress"/>
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

  cy.showColumn('gnomAD ALT', 0);
  cy.showColumn('QP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
});

describe('Page des variants d\'un patient (paired) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 2, 'FlagDropdown');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 3, 'NoteCell');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 4, 'InterpretationCell');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 5, 'chr10:g.17617338A>C');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 6, 'SNV');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 7, 'TN');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 7, 'ant-tag-red');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 8, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 9, 'HACD1');
    cy.validateTableDataRowKeyAttr('2f53f2ed574a720853172ff224c608efc5e3b623', 9, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 10, 'ConsequencesCell_highImpact');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 10, 'Start Lost p.Met1Arg');
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(11).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(11).find('path[d*="M8.98279"]').should('exist'); // M
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(11).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 12, 'AR');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 12, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 13, /^VUS$/);
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 13, 'ant-tag-orange');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 14, 'hotspotOutlined');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 15, 'ND');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 15, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 16, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 17, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 18, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 19, /^0$/);
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 19, '(0.00e+0)');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 20, /^1$/);
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 20, '(1.00e+0)');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 21, '14.62');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 22, '0/1');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 23, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 24, '9');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 25, '136');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 26, '0.07');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 27, 'Weak Evidence');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 28, '2.25e+1');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 29, '2.30e-1');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'SNV');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider la fonctionnalité du radio bouton SNV (TO)-SNV (TN)-CNV (TO)', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV (TN)').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('SNV (TO)').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV (TO)').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('CNV (TO)').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV (TO)').should('exist');
  });
});
