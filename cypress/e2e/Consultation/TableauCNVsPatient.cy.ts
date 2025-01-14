/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

describe('Page des CNVs d\'un patient - Consultation du tableau', () => {
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

  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyClass('*', 1, 'FlagDropdown');
    cy.validateTableDataRowKeyContent('*', 4, 'CFHR1');
    cy.validateTableDataRowKeyContent('*', 4, 'CFHR3');
    cy.validateTableDataRowKeyContent('*', 5, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyContent('*', 6, /^1$/);
    cy.validateTableDataRowKeyContent('*', 7, '196 774 872');
    cy.validateTableDataRowKeyContent('*', 8, '196 832 006');
    cy.validateTableDataRowKeyContent('*', 9, /^GAIN$/);
    cy.validateTableDataRowKeyContent('*', 10, '57.1 kb');
    cy.validateTableDataRowKeyContent('*', 11, '1.38788');
    cy.validateTableDataRowKeyContent('*', 12, /^3$/);
    cy.validateTableDataRowKeyContent('*', 13, '132');
    cy.validateTableDataRowKeyContent('*', 13, '5.28e-1');
    cy.validateTableDataRowKeyContent('*', 14, /^2$/);
    cy.validateTableDataRowKeyContent('*', 15, './1');
    cy.validateTableDataRowKeyContent('*', 16, 'PASS');
    cy.validateTableDataRowKeyContent('*', 17, /^75$/);
    cy.validateTableDataRowKeyContent('*', 18, /^22$/);
    cy.validateTableDataRowKeyContent('*', 19, '3, 0');
    cy.validateTableDataRowKeyContent('*', 20, '-');
    cy.validateTableDataRowKeyContent('*', 21, '-');
  });
 
<<<<<<< HEAD
  it('Valider les liens disponibles Lien Gènes', () => {
=======
  it('Valider la fonctionnalité du radio bouton SNV-CNV', () => {
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');

    cy.get('[class*="VariantSectionNav"]').contains('SNV').clickAndWait({force: true});
    cy.get('[class*="VariantSectionNav"] [class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');
  });
 
  it('Valider les liens disponibles', () => {
>>>>>>> f0e329a9 (feat: CLIN-3102 Adjust Cypress tests)
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
});

describe('Page des CNVs d\'un patient - Consultation du tableau', () => {
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
    cy.showColumn('Trans.', 0);
    cy.showColumn('OP', 0);
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'GAIN');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('GAIN:chr10:126388041-126388160', 5, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('LOSS:chrY:22406016-22406135', 5, true);
  });
  
  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^1$/, 6, true);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^Y$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('14 806', 7, true);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('238 158 998', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin', () => {
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('14 939', 8, true);
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('238 159 213', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('GAIN', 9, true);
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('LOSS', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('2 bp', 10, true);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('1.5 Mb', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('0.00831442', 11, true);
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('2.7587', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri CN', () => {
    cy.sortTableAndIntercept('CN', 1);
    cy.validateTableFirstRow(/^0$/, 12, true);
    cy.sortTableAndIntercept('CN', 1)
    cy.validateTableFirstRow(/^6$/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM', () => {
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('131', 13, true);
    cy.sortTableAndIntercept('RQDM', 1)
    cy.validateTableFirstRow('239', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes', () => {
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^0$/, 14, true);
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow('38', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^3$/, 17, true);
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow('150', 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri BC', () => {
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^1$/, 18, true);
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow('119', 18, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    cy.sortTableAndIntercept('Trans.', 1);
    cy.validateTableFirstRow('-', 20, true);
    cy.sortTableAndIntercept('Trans.', 1);
    cy.validateTableFirstRow('-', 20, true);
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    cy.sortTableAndIntercept('OP', 1);
    cy.validateTableFirstRow('-', 21, true);
    cy.sortTableAndIntercept('OP', 1);
    cy.validateTableFirstRow('-', 21, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndIntercept('Début', 0);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('207 526 712', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('196', 1);
  });
});
  