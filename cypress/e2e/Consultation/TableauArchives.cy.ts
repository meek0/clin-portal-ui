/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'archives - Consultation du tableau', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitArchivesPatientPage(epCHUSJ_ldmCHUSJ.patientProbId);
    cy.showColumn('URL', 0);
    cy.showColumn('Taille', 0);
    cy.showColumn('Hash', 0);
    cy.showColumn('Lot', 0);
  };

  it('Vérifier les informations affichées', () => {
    setupTest();
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 0, 'https://ferload.qa.cqgc.hsj.rtss.qc.ca/');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 1, '16774.exomiser.variants.tsv');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 2, 'EXOMISER');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 3, 'TSV');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 4, epCHUSJ_ldmCHUSJ.patientProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 5, 'Cas-index');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 6, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 7, epCHUSJ_ldmCHUSJ.sampleProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 8, epCHUSJ_ldmCHUSJ.bioAnalProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 9, epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4));
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 10, '30.08 KB');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 11, '-');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 12, 'A00516_0169');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 13, 'Fichier');
  });
 
  it('Valider les liens disponibles Lien Requête', () => {
    setupTest();
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="16774.exomiser.variants.tsv"]').contains(epCHUSJ_ldmCHUSJ.requestProbId).clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
 
  it('Valider les liens disponibles Lien Analyse bioinfo', () => {
    setupTest();
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="16774.exomiser.variants.tsv"]').contains(epCHUSJ_ldmCHUSJ.bioAnalProbId).clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    setupTest();
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('BED', 3);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('VCF', 3);
  });
  
  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    setupTest();
    cy.sortTableAndWait('Patient');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.patientProbId, 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Parenté', () => {
    setupTest();
    cy.sortTableAndWait('Parenté');
    cy.validateTableFirstRow('Cas-index', 5);
    cy.sortTableAndWait('Parenté');
    cy.validateTableFirstRow('Cas-index', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Requête', () => {
    setupTest();
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 6);
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse bioinfo', () => {
    setupTest();
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalProbId, 8);
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalProbId, 8);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Patient');
    cy.validateTableFirstRow('BED', 3);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    cy.validateTableResultsCount('Résultats 1 - ', false);
  });
});
