/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  cy.get(`[data-cy="SidebarMenuItem_Gène"]`).clickAndWait({force: true});
  cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
  cy.get('[class*="UploadModal"] textarea').type('prdx1,nkefa ensg00000117450\nunknown');
});

describe('Page des variants d\'un patient - Téléverser une liste de gènes', () => {
  it('Vérifier les informations affichées - Popover', () => {
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Identifiants et formats de fichier acceptés').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Identifiants').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Symbole du gène, Alias, Ensembl ID').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Séparateurs').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('virgule, espace blanc, retour de ligne').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Formats de fichier').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Limite').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('1500 éléments autorisés par téléversement').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    cy.get('[class*="UploadModal"] textarea').contains('prdx1').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').clickAndWait({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('prdx1').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').clickAndWait({force: true});

    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable', () => {
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Résumé (3 reconnus, 1 inconnus)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus) [CLIN-2904]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('4 identifiants soumis correspondant à 1 identifiants système uniques').should('exist');
    cy.get('[data-node-key="matched"]').contains('Reconnus (3)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Identifiants soumis').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Correspond à').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Ensembl ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Symbole').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="0"] td').eq(0).contains('prdx1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="0"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="0"] td').eq(2).contains('PRDX1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="1"] td').eq(0).contains('nkefa').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="1"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="1"] td').eq(2).contains('PRDX1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="2"] td').eq(0).contains('ensg00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="2"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="2"] td').eq(2).contains('PRDX1').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus)', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-node-key="unmatched"]').clickAndWait({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Inconnus (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Identifiants soumis').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Correspond à').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Ensembl ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Symbole').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Gènes', ['Liste téléversée']);
    cy.validateTotalSelectedQuery('13');
    cy.validateTableResultsCount('13');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('Liste téléversée').clickAndWait({force:true});
    cy.get('[class*="filtersDropdown"]').should('not.exist');
  });
});
