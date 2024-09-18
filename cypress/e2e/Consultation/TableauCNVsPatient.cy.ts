/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.showColumn('GT', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Qual.', 0);
  cy.showColumn('MS', 0);
  cy.showColumn('BC', 0);
  cy.showColumn('PE', 0);
});

describe('Page des CNVs d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 2, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 3, 'CFHR1');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 3, 'CFHR3');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 4, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 5, /^1$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 6, '196 774 872');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 7, '196 832 006');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 8, /^GAIN$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 9, '57.1 kb');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 10, '1.38788');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 11, /^3$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 12, /^2$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 13, './1');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 14, 'PASS');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 15, /^75$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 16, /^22$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 17, '3, 0');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'GAIN');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
  });
 
  it('Valider les liens disponibles', () => {
    cy.get('tr[data-row-key="c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c"]').contains(/^2$/).clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c"]').contains('CFHR1').clickAndWait({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('GAIN:chr10:126388041-126388160', 4, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('LOSS:chrY:22406016-22406135', 4, true);
  });
  
  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^1$/, 5, true);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^Y$/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('14 806', 6, true);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('238 158 998', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin', () => {
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('14 939', 7, true);
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('238 159 213', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('GAIN', 8, true);
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('LOSS', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('2 bp', 9, true);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('1.5 Mb', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('0.00831442', 10, true);
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('2.7587', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri CN', () => {
    cy.sortTableAndIntercept('CN', 1);
    cy.validateTableFirstRow(/^0$/, 11, true);
    cy.sortTableAndIntercept('CN', 1)
    cy.validateTableFirstRow(/^6$/, 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes', () => {
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^0$/, 12, true);
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow('38', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^3$/, 15, true);
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow('150', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri BC', () => {
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^1$/, 16, true);
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow('119', 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndIntercept('Début', 0);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('207 526 712', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('196', 1);
  });
});
  